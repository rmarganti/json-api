import { ResourceObjectOrObjects, ResponseWithData } from 'ts-json-api';

/**
 * From `T` remove properties that exist in `T1` (`T1` is a subtype of `T`).
 *
 * ```ts
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

export type ActionsUnion<A extends ActionCreatorsMapObject> = ReturnType<
    A[keyof A]
>;
