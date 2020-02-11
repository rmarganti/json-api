import { Reducer, useReducer, useCallback } from 'react';
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

/**
 * Creates a state machine that tracks the status and result of an API request.
 */
export const useRequestMachine = <Data = any>(
    cachedResponse?: ResponseShape<Data>
): [UseRequestState<Data>, UseRequestActions<Data>] => {
    const [state, dispatch] = useReducer(reducer, cachedResponse, init);

    const onRequestMade = useCallback(() => dispatch(requestMade()), []);

    const onRequestSuccess = useCallback(
        (response: ResponseShape<Data>) => dispatch(requestSuccess(response)),
        []
    );

    const onRequestError = useCallback(
        (response: ResponseWithErrors) => dispatch(requestError(response)),
        []
    );

    return [
        state,
        {
            requestError: onRequestError,
            requestMade: onRequestMade,
            requestSuccess: onRequestSuccess,
        },
    ];
};

const REQUEST_MADE = 'REQUEST_MADE';
const REQUEST_SUCCESS = 'REQUEST_SUCCESS';
const REQUEST_ERROR = 'REQUEST_ERROR';

const reducer: Reducer<UseRequestState, UseRequestAction> = (state, action) => {
    switch (state.status) {
        case 'idle':
            switch (action.type) {
                case REQUEST_MADE:
                    return {
                        status: 'loading',
                        error: null,
                        response: state.response,
                    } as LoadingState;

                default:
                    return state;
            }

        case 'loading':
            switch (action.type) {
                case REQUEST_SUCCESS:
                    return {
                        status: 'success',
                        error: null,
                        response: action.payload,
                    } as SuccessState;

                case REQUEST_ERROR:
                    return {
                        status: 'error',
                        error: action.payload,
                        response: state.response,
                    } as ErrorState;

                default:
                    return state;
            }

        case 'success':
            switch (action.type) {
                case REQUEST_MADE:
                    return {
                        status: 'loading',
                        error: null,
                        response: state.response,
                    };

                default:
                    return state;
            }

        case 'error':
            switch (action.type) {
                case REQUEST_MADE:
                    return {
                        status: 'loading',
                        error: null,
                        response: state.response,
                    };

                default:
                    return state;
            }
    }
};

const init = <Data = any>(
    cachedResponse?: ResponseShape<Data>
): IdleState<Data> => ({
    status: 'idle',
    error: null,
    response: cachedResponse || null,
});

const requestMade = () => createAction(REQUEST_MADE);
type RequestMade = ReturnType<typeof requestMade>;

const requestSuccess = <Data = any>(response: ResponseShape<Data>) =>
    createAction(REQUEST_SUCCESS, response);
type RequestSuccess = ReturnType<typeof requestSuccess>;

const requestError = (response: ResponseWithErrors) =>
    createAction(REQUEST_ERROR, response);
type RequestError = ReturnType<typeof requestError>;

type UseRequestAction = RequestMade | RequestSuccess | RequestError;
