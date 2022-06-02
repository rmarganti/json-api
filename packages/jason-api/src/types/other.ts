import { ResourceObjectOrObjects, ResponseWithData } from 'ts-json-api';

/**
 * From `T` remove properties that exist in `T1` (`T1` is a subtype of `T`).
 *
 * ```typescript
 * type A = { one: string; two: string; three: string; };
 * type B = { two: string; three: string; };
 *
 * // Expect: { one: string; }
 * type Result = Subtract<A, B>;
 * ```
 */
export type Subtract<T extends T1, T1 extends object> = Pick<
    T,
    Exclude<keyof T, keyof T1>
>;

export type FlexiblePayload = ResourceObjectOrObjects | ResponseWithData;

export type FunctionType = (...args: any[]) => any;

export type ActionCreatorsMapObject = { [actionCreator: string]: FunctionType };

export type ActionsMap<A extends ActionCreatorsMapObject> = {
    [K in keyof A]: ReturnType<A[K]>;
};

export type ActionsUnion<A extends ActionCreatorsMapObject> = ReturnType<
    A[keyof A]
>;

export type CacheScheme = 'cacheFirst' | 'cacheOnce' | 'cacheOnly' | 'noCache';

/**
 * When should JasonAPI `useRequest()` and `useAutoRequest()` hooks query the cache?
 *
 * `onMount` - Only query the cache when the Component mounts.
 * `onActionChange` - Query the cache on Component mount and any time the action shape changes.
 */
export type CacheQueryTiming = 'onMount' | 'onActionChange';
