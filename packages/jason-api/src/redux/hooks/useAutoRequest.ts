/**
 * useAutoRequest()
 * --------------------------------
 * Automatically dispatch a JasonAPI Request and return the response.
 *
 * ```ts
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
import { deepDependencyCheck } from '../../utils';
import { useRequest, UseRequestOptions, UseRequestResult } from './useRequest';

export const useAutoRequest = <Data = any>(
    options: UseRequestOptions<Data>
): UseRequestResult<Data> => {
    const [request, fetch] = useRequest<Data>(options);

    // Make the request
    useEffect(() => {
        fetch();
    }, deepDependencyCheck([options.action]));

    return [request, fetch];
};
