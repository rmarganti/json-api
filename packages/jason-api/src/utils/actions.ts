import { pickBy } from 'ramda';

import { hashObject } from './data';
import { RequestConfig } from '../types/request';
import { JasonApiRequestAction } from '../redux/actions/actions';
import { JASON_API } from '../redux/actions/actionTypes';

export interface Action<T extends string> {
    type: T;
}

export interface ActionWithPayload<T extends string, P> extends Action<T> {
    payload: P;
}

/**
 * Create an action whose strong typing is inferred
 * from it's redux action type and optional payload.
 *
 * @param type
 * @param payload
 */
export function createAction<T extends string>(type: T): Action<T>;
export function createAction<T extends string, P>(
    type: T,
    payload: P
): ActionWithPayload<T, P>;
export function createAction<T extends string, P>(type: T, payload?: P) {
    return payload === undefined ? { type } : { type, payload };
}

/**
 * Generate a deterministic cache key for a Request Action.
 */
export const cacheKeyForRequestAction = <Data = any>(
    requestActionPayload: RequestConfig<Data>
) => requestActionPayload.cacheKey || hashObject(requestActionPayload);

/**
 * Removes functions from an object, so that
 * it can be deep-compared with another.
 */
export const toComparableAction = <T extends JasonApiRequestAction>(
    action: T
): Omit<
    T[typeof JASON_API],
    | 'onError'
    | 'onSuccess'
    | 'transformer'
    | 'setRelationshipOnSuccess'
    | 'addRelationshipOnSuccess'
    | 'removeRelationshipOnSuccess'
    | 'removeResourceObjectOnSuccess'
    | 'updateResourceObjectOnSuccess'
> => pickBy(isNotFunction, action[JASON_API]);

const isNotFunction = (input: unknown): boolean =>
    !input || {}.toString.call(input) !== '[object Function]';
