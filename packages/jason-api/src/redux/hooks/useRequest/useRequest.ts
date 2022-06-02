/**
 * useRequest()
 * --------------------------------
 * Provide a method to dispatch an JasonAPI action,
 * while keeping track of loading status and responses.
 *
 * Example:
 *
 * ```typescript
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
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ResponseWithErrors } from 'ts-json-api';

// Internal dependencies
import { CacheQueryTiming, CacheScheme } from '../../../types/other';
import { JasonApiDispatch } from '../../../types/redux';
import { ResponseShape } from '../../../types/request';
import { StateWithJasonApi } from '../../../types/state';
import {
    cacheKeyForRequestAction,
    deepDependencyCheck,
    toComparableAction,
} from '../../../utils';
import { JasonApiRequestAction, JASON_API } from '../../actions';
import { getCachedQuery } from '../../selectors';
import { useRequestMachine } from './useRequestMachine';
import { UseRequestState } from './types';

// We assume `deps` will be a static array and don't want
// to use `request` as a dependency, since it is an object.
/* eslint-disable react-hooks/exhaustive-deps */

export interface UseRequestOptions<Data> {
    action: JasonApiRequestAction<Data>;
    cacheScheme?: CacheScheme;
    queryCache?: CacheQueryTiming;
    expandResourceObjects?: boolean;
    onError?: (response: ResponseWithErrors) => void;
    onSuccess?: (response: ResponseShape<Data>) => void;
}

export type UseRequestResult<Data = any> = [UseRequestState<Data>, () => void];

export const useRequest = <Data = any>({
    action,
    cacheScheme = 'cacheFirst',
    queryCache = 'onMount',
    expandResourceObjects = false,
    onError,
    onSuccess,
}: UseRequestOptions<Data>): UseRequestResult<Data> => {
    // Get cached response.
    const cacheKey = cacheKeyForRequestAction(action[JASON_API]);

    const cachedResponse = useSelector((state: StateWithJasonApi) =>
        getCachedQuery(state, cacheKey, expandResourceObjects)
    ) as ResponseShape<Data>;

    const dispatch = useDispatch<JasonApiDispatch>();

    const [state, actions] = useRequestMachine<Data>({
        cacheScheme,
        cachedResponse,
    });

    const haveResponse = !!state.response;

    // Used to check if the action has changed and should result in a re-fetch.
    const comparableAction = toComparableAction(action);

    // Update internal response state when the cache key changes.
    useEffect(() => {
        if (queryCache === 'onActionChange' && cacheScheme !== 'noCache') {
            actions.cacheChanged(cachedResponse);
        }
    }, [cacheKey]);

    // Initial request.
    useEffect(() => {
        // We should not initiate a request in an invalid state,
        // or if the cache scheme is `cacheOnly`.
        if (state.status !== 'loading' || cacheScheme === 'cacheOnly') {
            return;
        }

        let canceled: boolean = false;

        dispatch(action)
            .then(successResponse => {
                if (canceled) {
                    return;
                }

                // Store the success response.
                actions.requestSuccess(successResponse);

                // Trigger optional success callback.
                if (onSuccess) {
                    onSuccess(successResponse);
                }
            })
            .catch(e => {
                if (canceled) {
                    return;
                }

                // The middleware always throws errors
                // as a valid JsonAPI error response.
                const errorResponse = e as ResponseWithErrors;

                // Store error response.
                actions.requestError(errorResponse);

                // Trigger optional error callback.
                if (onError) {
                    onError(errorResponse);
                }
            });

        return () => {
            canceled = true;
        };
    }, deepDependencyCheck([comparableAction, haveResponse, state.status]));

    return [state, actions.requestMade];
};
