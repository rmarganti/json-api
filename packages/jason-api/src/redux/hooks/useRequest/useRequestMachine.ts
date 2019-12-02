import { Reducer, useReducer } from 'react';
import { ResponseWithErrors } from 'ts-json-api';

import { ResponseShape } from '../../../types/request';
import { createAction } from '../../../utils';
import {
    ErrorState,
    IdleState,
    LoadingState,
    SuccessState,
    UseRequestActions,
    UseRequestState,
} from './types';

export const useRequestMachine = <Data = any>(
    cachedResponse?: ResponseShape<Data>
): [UseRequestState<Data>, UseRequestActions<Data>] => {
    const [state, dispatch] = useReducer(
        createReducer<Data>(),
        cachedResponse,
        init
    );

    const onRequestMade = () => dispatch(requestMade());

    const onRequestSuccess = (response: ResponseShape<Data>) =>
        dispatch(requestSuccess(response));

    const onRequestError = (response: ResponseWithErrors) =>
        dispatch(requestError(response));

    return [
        state,
        {
            requestError: onRequestError,
            requestMade: onRequestMade,
            requestSuccess: onRequestSuccess,
        },
    ];
};

const createReducer = <Data = any>(): Reducer<
    UseRequestState<Data>,
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
                    } as SuccessState<Data>;

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
                    } as LoadingState<Data>;

                default:
                    return state;
            }

        case 'error':
            switch (action.type) {
                case 'REQUEST_MADE':
                    return {
                        status: 'loading',
                        error: undefined,
                    } as LoadingState<Data>;

                default:
                    return state;
            }
    }

    return state;
};

const init = <Data = any>(
    cachedResponse?: ResponseShape<Data>
): IdleState<Data> => ({
    status: 'idle',
    response: cachedResponse,
});

const requestMade = () => createAction('REQUEST_MADE');
type RequestMade = ReturnType<typeof requestMade>;

const requestSuccess = <Data = any>(response: ResponseShape<Data>) =>
    createAction('REQUEST_SUCCESS', response);
type RequestSuccess = ReturnType<typeof requestSuccess>;

const requestError = (response: ResponseWithErrors) =>
    createAction('REQUEST_ERROR', response);
type RequestError = ReturnType<typeof requestError>;

type UseRequestAction = RequestMade | RequestSuccess | RequestError;
