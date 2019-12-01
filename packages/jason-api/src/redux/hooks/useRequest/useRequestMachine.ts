import { Reducer, useReducer } from 'react';
import { ResponseWithErrors } from 'ts-json-api';

import { createAction } from '../../../utils';
import {
    ErrorState,
    IdleState,
    LoadingState,
    SuccessState,
    UseRequestReducerState,
} from './types';

const initialState: IdleState = {
    status: 'idle',
};

const createReducer = <T = any>(): Reducer<
    UseRequestReducerState<T>,
    UseRequestAction
> => (state, action) => {
    switch (state.status) {
        case 'idle':
            switch (action.type) {
                case 'REQUEST_MADE':
                    return {
                        status: 'loading',
                    } as LoadingState;

                default:
                    return state;
            }

        case 'loading':
            switch (action.type) {
                case 'REQUEST_SUCCESS':
                    return {
                        status: 'success',
                        error: undefined,
                        response: action.payload,
                    } as SuccessState<T>;

                case 'REQUEST_ERROR':
                    return {
                        status: 'error',
                        error: action.payload,
                    } as ErrorState;

                default:
                    return state;
            }

        case 'success':
            switch (action.type) {
                case 'REQUEST_MADE':
                    return {
                        status: 'loading',
                        response: state.response,
                        error: undefined,
                    } as LoadingState<T>;

                default:
                    return state;
            }

        case 'error':
            switch (action.type) {
                case 'REQUEST_MADE':
                    return {
                        status: 'loading',
                        error: undefined,
                    } as LoadingState<T>;

                default:
                    return state;
            }
    }

    return state;
};

export const useRequestMachine = <T = any>() => {
    const [state, dispatch] = useReducer(
        createReducer<T>(),
        initialState as UseRequestReducerState<T>
    );

    const onRequestMade = () => dispatch(requestMade());

    const onRequestSuccess = (response: T) =>
        dispatch(requestSuccess(response));

    const onRequestError = (response: ResponseWithErrors) =>
        dispatch(requestError(response));

    return {
        state,
        requestError: onRequestError,
        requestMade: onRequestMade,
        requestSuccess: onRequestSuccess,
    };
};

/**
 * An API request is currently being made
 */
export const requestMade = () => createAction('REQUEST_MADE');
type RequestMade = ReturnType<typeof requestMade>;

export const requestSuccess = <T = any>(response: T) =>
    createAction('REQUEST_SUCCESS', response);
type RequestSuccess = ReturnType<typeof requestSuccess>;

export const requestError = (response: ResponseWithErrors) =>
    createAction('REQUEST_ERROR', response);
type RequestError = ReturnType<typeof requestError>;

type UseRequestAction = RequestMade | RequestSuccess | RequestError;
