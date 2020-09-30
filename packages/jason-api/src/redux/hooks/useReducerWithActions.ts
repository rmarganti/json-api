import { Dispatch, Reducer, ReducerState, useMemo, useReducer } from 'react';
import { ActionCreatorsMapObject } from 'redux';

/**
 * A map object of action creators wrapped in `dispatch()` calls.
 */
export type BoundActionCreatorsMapObject<A extends ActionCreatorsMapObject> = {
    [K in keyof A]: (...args: Parameters<A[K]>) => void;
};

/**
 * Use a Reducer with mapped object of actions. Those actions
 * will automatically be wrapped with `dispatch()` calls.
 *
 * Usage is same as `useReducer()` with addition of Action Creator Map.
 *
 * https://reactjs.org/docs/hooks-reference.html#usereducer
 */
export function useReducerWithActions<
    R extends Reducer<any, any>,
    A extends ActionCreatorsMapObject,
    I
>(
    reducer: R,
    actions: A,
    initializerArg: ReducerState<R>,
    initializer?: undefined
): [ReducerState<R>, BoundActionCreatorsMapObject<A>];

export function useReducerWithActions<
    R extends Reducer<any, any>,
    A extends ActionCreatorsMapObject,
    I
>(
    reducer: R,
    actions: A,
    initializerArg: I,
    initializer: (arg: I) => ReducerState<R>
): [ReducerState<R>, BoundActionCreatorsMapObject<A>];

export function useReducerWithActions<
    R extends Reducer<any, any>,
    A extends ActionCreatorsMapObject
>(reducer: R, actions: A, initializerArg: any, initializer?: any) {
    const [state, dispatch] = useReducer(reducer, initializerArg, initializer);

    // Wrap all the actions in a `dispatch()`.
    const wrappedActions = useMemo(
        () => bindActionCreators(actions, dispatch),
        [actions]
    );

    return [state, wrappedActions];
}

/**
 * Takes an object map of action creators and wraps them in a
 * `dispatch()` call. For use with React's `useReducer()`;
 */
const bindActionCreators = <ACMO extends ActionCreatorsMapObject>(
    actionCreators: ACMO,
    dispatch: Dispatch<any>
): BoundActionCreatorsMapObject<ACMO> => {
    return Object.entries(actionCreators).reduce<
        BoundActionCreatorsMapObject<any>
    >(
        (carrier, [key, actionCreator]) => ({
            ...carrier,
            [key]: (...args: any[]) => dispatch(actionCreator(...args)),
        }),
        {}
    );
};
