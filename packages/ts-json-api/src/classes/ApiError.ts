import { clone } from 'ramda';

import { Error } from '../types';

export class ApiError {
    private error: Error;

    constructor(error: Error) {
        this.error = error;
        Object.freeze(this);
    }

    static of(error: Error): ApiError {
        return new ApiError(error);
    }

    map(f: (x: Error) => Error) {
        return ApiError.of(f(this.error));
    }

    toJSON() {
        return clone(this.error);
    }
}
