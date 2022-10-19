/**
 * useAutoRequest()
 * --------------------------------
 * Automatically dispatch a JasonAPI Request and return the response.
 *
 * ```typescript
 * import React from 'react';
 * import { useAutoResponse } from 'jason-api';
 * import { useDispatch } from 'react-redux';
 *
 * import { fetchUser } from './actions';
 *
 * const SomeComponent: React.FunctionComponent<{ id: string }> = ({ id }) => {
 *     const action = fetchUser(id);
 *     const { data, errors, isLoading } = useAutoRequest(
 *          { action },
 *         [id]
 *     );
 *
 *     // Do stuff!
 * };
 *
 * ```
 */

// We assume `deps` will be a static array and don't want
// to use `request` as a dependency, since it is an object.
/* eslint-disable react-hooks/exhaustive-deps */

// External dependencies
import { useEffect } from 'react';

// Internal dependencies
import { deepDependencyCheck, toComparableAction } from '../../utils';
import { useRequest, UseRequestOptions, UseRequestResult } from './useRequest';

export const useAutoRequest = <Data = any>(
    options: UseRequestOptions<Data>
): UseRequestResult<Data> => {
    const [request, fetch] = useRequest<Data>(options);

    // Used to check if the action has changed and should result in a re-fetch.
    const comparableAction = toComparableAction(options.action);

    /************************************************
     *
     * Handle NON `cacheFirst` schema. It does not
     * rely on a cached response being present.
     *
     ************************************************/

    useEffect(() => {
        if (options.cacheScheme === 'cacheOnce') {
            return;
        }

        fetch();
    }, deepDependencyCheck([comparableAction, options.cacheScheme]));

    /************************************************
     *
     * Handle `cacheFirst` schema. It depends on the
     * present on whether a cached response is available,
     * and is handled differently.
     *
     ************************************************/

    const hasResponse = !!request.response;
    useEffect(() => {
        if (options.cacheScheme !== 'cacheOnce' || hasResponse) {
            return;
        }

        fetch();
    }, deepDependencyCheck([comparableAction, hasResponse, options.cacheScheme]));

    return [request, fetch];
};
