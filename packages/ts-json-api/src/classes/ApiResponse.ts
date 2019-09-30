import { clone, path, prop } from 'ramda';

import { Error, Response, ResponseWithMetaData } from '../types';
import { convertToApiResourceObjectOrObjects } from '../utils';
import { ApiError } from './ApiError';
import { ApiResourceObject } from './ApiResourceObject';

export class ApiResponse<D extends Response = Response> {
    private response: D;

    constructor(response: D) {
        this.response = response;
        Object.freeze(this);
    }

    static of<S extends Response>(response: S): ApiResponse<S> {
        return new ApiResponse(response);
    }

    map(f: (x: D) => D): ApiResponse<D> {
        return ApiResponse.of(f(this.response));
    }

    /**
     * Retrieve the data from the response
     * as an ApiResourceObject or array of ApiResourceObjects
     */
    data() {
        return convertToApiResourceObjectOrObjects(this.response.data);
    }

    /**
     * Retrieve all errors as an array of ApiErrors
     */
    errors(): ApiError[] {
        const errors: Error[] = this.response.errors || [];
        return errors.map(ApiError.of);
    }

    /**
     * Does the JsonApi response have an error?
     */
    hasError(): boolean {
        return this.errors().length > 0;
    }

    /**
     * Retrieves all includes an array of ApiResourceObjects
     */
    included(): ApiResourceObject[] {
        return convertToApiResourceObjectOrObjects(
            this.response.included || []
        );
    }

    /**
     * Expand a partial ApiResourceObject to the version in the includes. This is
     * useful for retrieving the full data from a relationships.
     *
     * @param entity An partial ApiResourceObject with only `id` and `type` fields
     */
    expandInclude(entity: ApiResourceObject) {
        if (this.included().length === 0) {
            return undefined;
        }

        return this.included().find((include: ApiResourceObject) => {
            return (
                include.id() === entity.id() && include.type() === entity.type()
            );
        });
    }

    meta(name: string) {
        const metaFinder: (response: ResponseWithMetaData) => any = name
            ? path(['meta', name])
            : prop('meta');

        return metaFinder(this.response as ResponseWithMetaData);
    }

    /**
     * Map to the original JSON object
     */
    toJSON(): D {
        return clone(this.response);
    }
}
