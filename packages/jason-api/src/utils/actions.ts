import { hashObject } from './data';
import { RequestConfig } from '../types/request';
import { ResourceObjectOrObjects } from 'ts-json-api';

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
export const cacheKeyForRequestAction = <Data extends ResourceObjectOrObjects>(
    requestActionPayload: RequestConfig<Data>
) => requestActionPayload.cacheKey || hashObject(requestActionPayload);
