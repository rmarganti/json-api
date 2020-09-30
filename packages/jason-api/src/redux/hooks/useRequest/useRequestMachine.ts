import { Reducer } from 'react';
import { ResponseWithErrors } from 'ts-json-api';

import { ActionsMap, ActionsUnion } from '../../../types/other';
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
import { useReducerWithActions } from '../useReducerWithActions';

/**
 * Creates a state machine that tracks the status and result of an API request.
 */
export const useRequestMachine = <Data = any>(
    cachedResponse?: ResponseShape<Data>
): [UseRequestState<Data>, UseRequestActions<Data>] =>
    useReducerWithActions(reducer, actions, cachedResponse, init);

const REQUEST_MADE = 'REQUEST_MADE';
const REQUEST_SUCCESS = 'REQUEST_SUCCESS';
const REQUEST_ERROR = 'REQUEST_ERROR';
const CACHE_CHANGED = 'CACHE_CHANGED';

const reducer: Reducer<UseRequestState, UseRequestAction> = (state, action) => {
    switch (state.status) {
        case 'idle':
        case 'success':
        case 'error':
            switch (action.type) {
                case REQUEST_MADE:
                    return {
                        status: 'loading',
                        error: null,
                        response: state.response,
                    } as LoadingState;

                case CACHE_CHANGED:
                    return handleCacheChange(state, action);

                default:
                    return state;
            }

        case 'loading':
            switch (action.type) {
                case REQUEST_MADE:
                    return {
                        status: 'loading',
                        error: null,
                        response: state.response,
                    } as LoadingState;

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

                case CACHE_CHANGED:
                    return handleCacheChange(state, action);

                default:
                    return state;
            }

        default:
            return state;
    }
};

const handleCacheChange = (
    state: UseRequestState,
    action: UseRequestActionMap['cacheChanged']
) =>
    action.payload === state.response
        ? state
        : {
              ...state,
              response: action.payload,
          };

const init = <Data = any>(
    cachedResponse?: ResponseShape<Data>
): IdleState<Data> => ({
    status: 'idle',
    error: null,
    response: cachedResponse || null,
});

const actions = {
    requestMade: () => createAction(REQUEST_MADE),
    requestSuccess: <Data = any>(response: ResponseShape<Data>) =>
        createAction(REQUEST_SUCCESS, response),
    requestError: (response: ResponseWithErrors) =>
        createAction(REQUEST_ERROR, response),
    cacheChanged: <Data = any>(cachedResponse?: ResponseShape<Data>) =>
        createAction(CACHE_CHANGED, cachedResponse),
};

type UseRequestActionMap = ActionsMap<typeof actions>;

type UseRequestAction = ActionsUnion<typeof actions>;
