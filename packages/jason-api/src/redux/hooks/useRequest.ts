/**
 * useRequest()
 * --------------------------------
 * Provide a method to dispatch an JasonAPI action,
 * while keeping track of loading status and responses.
 *
 * Example:
 *
 * ```ts
 * import React from 'react';
 * import { jasonApiRequest, useRequest } from 'jason-api';
 * import { useDispatch } from 'react-redux';
 *
 * import { ArticleResource } from './your-types.ts';
 *
 * const fetchArticles = () => jasonApiRequest<ArticleResource>({
 *     url: '/api/articles',
 * });
 *
 * const ArticlesList: React.FunctionComponent = () => {
 *     const action = fetchArticles();
 *
 *     const { data, errors, fetch, isLoading } = useRequest(
 *          { action },
 *     );
 *
 *     return (
 *         <button onClick={acceptYourHookOverlords.fetch}>
 *             {
 *                 isLoading
 *                     ? 'Please wait…'
 *                     : <pre>{JSON.stringify(data, null, 4)}</pre>
 *             }
 *         </button>
 *     );
 * };
 *
 * ```
 */

// External dependencies
import { useCallback, useState, DependencyList } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    ResourceObjectOrObjects,
    Response,
    ResponseWithErrors,
} from 'ts-json-api';

// Internal dependencies
import { JasonApiDispatch } from '../../types';
import { cacheKeyForRequestAction } from '../../utils';
import { JasonApiRequestAction, JASON_API } from '../actions';
import { getCachedQuery } from '../selectors';
import { StateWithJasonApi } from 'src/types/state';

// We assume `deps` will be a static array and don't want
// to use `request` as a dependency, since it is an object.
/* eslint-disable react-hooks/exhaustive-deps */

export interface UseRequestOptions<Data extends ResourceObjectOrObjects> {
    action: JasonApiRequestAction<Data>;
    cacheScheme?: 'cacheFirst' | 'cacheOnly' | 'noCache';
    expandResourceObjects?: boolean;
    onError?: (response: ResponseWithErrors) => void;
    onSuccess?: (response: Response<Data>) => void;
}

export type UseRequestResult<Data extends ResourceObjectOrObjects> = Response<
    Data
> & {
    fetch: () => Promise<void>;
    isLoading: boolean;
};

export const useRequest = <
    Data extends ResourceObjectOrObjects = ResourceObjectOrObjects
>(
    {
        action,
        cacheScheme,
        expandResourceObjects,
        onError,
        onSuccess,
    }: UseRequestOptions<Data>,
    deps: DependencyList = []
) => {
    const dispatch = useDispatch<JasonApiDispatch>();
    const [isLoading, setLoading] = useState(false);
    const [response, setResponse] = useState<Response<Data>>();

    // Preform the fetch and keep track of loading states.
    const fetch = useCallback(async () => {
        if (cacheScheme === 'cacheOnly') {
            return;
        }

        // Start loading.
        setLoading(true);

        // Get the response.
        try {
            const successResponse = await dispatch(action);

            // Store the success response.
            setResponse(successResponse);

            // Trigger optional success callback.
            if (onSuccess) {
                onSuccess(successResponse);
            }
        } catch (e) {
            // The middleware always throws errors
            // as a valid JsonAPI error response.
            const errorResponse = e as ResponseWithErrors<Data>;

            // Store error response.
            setResponse(errorResponse);

            // Trigger optional error callback.
            if (onError) {
                onError(errorResponse);
            }
        }

        // Stop Loading.
        setLoading(false);
    }, deps);

    // Get cached response.
    const cacheKey = cacheKeyForRequestAction(action[JASON_API]);
    const cachedResponse = useSelector((state: StateWithJasonApi) =>
        getCachedQuery(state, cacheKey, expandResourceObjects)
    ) as Response<Data>;

    // Determine correct response to return.
    const providedResponse =
        cacheScheme === 'noCache' ? response : response || cachedResponse;

    return {
        ...providedResponse,
        fetch,
        isLoading,
    } as UseRequestResult<Data>;
};
