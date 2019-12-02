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
 * const fetchArticles = () => jasonApiRequest<ArticleResource[]>({
 *     url: '/api/articles',
 * });
 *
 * const ArticlesList: React.FunctionComponent = () => {
 *     const action = fetchArticles();
 *     const [request, refech] = useRequest({ action });
 *
 *     return (
 *         <button onClick={refetch}>
 *             { request.status === 'loading' && <span>Please wait...</span> }
 *             { request.status === 'success' && <pre>{JSON.stringify(data, null, 4)}</pre> }
 *             { request.status === 'error' && <span>Error!</span> }
 *         </button>
 *     );
 * };
 *
 * ```
 */

// External dependencies
import { useCallback, DependencyList } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ResponseWithErrors } from 'ts-json-api';

// Internal dependencies
import { JasonApiDispatch } from '../../../types/redux';
import { ResponseShape } from '../../../types/request';
import { StateWithJasonApi } from '../../../types/state';
import { cacheKeyForRequestAction } from '../../../utils';
import { JasonApiRequestAction, JASON_API } from '../../actions';
import { getCachedQuery } from '../../selectors';
import { useRequestMachine } from './useRequestMachine';
import { UseRequestState } from './types';

// We assume `deps` will be a static array and don't want
// to use `request` as a dependency, since it is an object.
/* eslint-disable react-hooks/exhaustive-deps */

export interface UseRequestOptions<Data> {
    action: JasonApiRequestAction<Data>;
    cacheScheme?: 'cacheFirst' | 'cacheOnly' | 'noCache';
    expandResourceObjects?: boolean;
    onError?: (response: ResponseWithErrors) => void;
    onSuccess?: (response: ResponseShape<Data>) => void;
}

export type UseRequestResult<Data = any> = [
    UseRequestState<Data>,
    () => Promise<void>
];

export const useRequest = <Data = any>(
    {
        action,
        cacheScheme,
        expandResourceObjects,
        onError,
        onSuccess,
    }: UseRequestOptions<Data>,
    deps: DependencyList = []
): UseRequestResult<Data> => {
    // Get cached response.
    const cacheKey = cacheKeyForRequestAction(action[JASON_API]);

    const cachedResponse = useSelector((state: StateWithJasonApi) =>
        getCachedQuery(state, cacheKey, expandResourceObjects)
    ) as ResponseShape<Data>;

    const dispatch = useDispatch<JasonApiDispatch>();
    const [state, actions] = useRequestMachine<Data>(
        cacheScheme === 'noCache' ? undefined : cachedResponse
    );

    // Preform the fetch and keep track of loading states.
    const fetch = useCallback(async () => {
        if (cacheScheme === 'cacheOnly') {
            return;
        }

        // Start loading.
        actions.requestMade();

        // Get the response.
        try {
            const successResponse = await dispatch(action);

            // Store the success response.
            actions.requestSuccess(successResponse);

            // Trigger optional success callback.
            if (onSuccess) {
                onSuccess(successResponse);
            }
        } catch (e) {
            // The middleware always throws errors
            // as a valid JsonAPI error response.
            const errorResponse = e as ResponseWithErrors;

            // Store error response.
            actions.requestError(errorResponse);

            // Trigger optional error callback.
            if (onError) {
                onError(errorResponse);
            }
        }
    }, deps);

    return [state, fetch];
};
