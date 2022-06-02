import { Reducer, useRef } from 'react';
import { ResponseWithErrors } from 'ts-json-api';

import { ActionsMap, ActionsUnion, CacheScheme } from '../../../types/other';
import { ResponseShape } from '../../../types/request';
import { createAction } from '../../../utils';
import { UseRequestActions, UseRequestState } from './types';
import { useReducerWithActions } from '../useReducerWithActions';

interface UseRequestMachineOptions<Data> {
    cachedResponse?: ResponseShape<Data>;
    cacheScheme: CacheScheme;
}

/**
 * Creates a state machine that tracks the status and result of an API request.
 */
export function useRequestMachine<Data = any>({
    cachedResponse,
    cacheScheme,
}: UseRequestMachineOptions<Data>): [
    UseRequestState<Data>,
    UseRequestActions<Data>
] {
    const reducer = useRef(createReducer({ cacheScheme }));

    return useReducerWithActions(
        reducer.current,
        actions,
        cachedResponse,
        createInitializer(cacheScheme)
    );
}

const REQUEST_MADE = 'REQUEST_MADE';
const REQUEST_SUCCESS = 'REQUEST_SUCCESS';
const REQUEST_ERROR = 'REQUEST_ERROR';
const CACHE_CHANGED = 'CACHE_CHANGED';

interface CreateReducerOptions {
    cacheScheme: CacheScheme;
}

function createReducer({
    cacheScheme,
}: CreateReducerOptions): Reducer<UseRequestState, UseRequestAction> {
    return (state, action) => {
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
                        };

                    case CACHE_CHANGED:
                        return handleCacheChange({
                            state,
                            action,
                            cacheScheme,
                        });

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
                        };

                    case REQUEST_SUCCESS:
                        return {
                            status: 'success',
                            error: null,
                            response: action.payload,
                        };

                    case REQUEST_ERROR:
                        return {
                            status: 'error',
                            error: action.payload,
                            response: state.response,
                        };

                    case CACHE_CHANGED:
                        return handleCacheChange({
                            state,
                            action,
                            cacheScheme,
                        });

                    default:
                        return state;
                }

            default:
                return state;
        }
    };
}

interface HandleCacheChangeOptions {
    cacheScheme: CacheScheme;
    state: UseRequestState;
    action: UseRequestActionMap['cacheChanged'];
}

function handleCacheChange({
    state,
    action,
    cacheScheme,
}: HandleCacheChangeOptions): UseRequestState {
    if (action.payload === state.response) {
        return state;
    }

    if (cacheScheme === 'cacheOnce') {
        return {
            status: 'success',
            response: action.payload,
            error: null,
        };
    }

    return {
        ...state,
        response: action.payload,
    };
}

function createInitializer(cacheScheme: CacheScheme) {
    return function<Data = any>(
        cachedResponse?: ResponseShape<Data>
    ): UseRequestState<Data> {
        if (cacheScheme === 'noCache') {
            return {
                status: 'idle',
                error: null,
                response: null,
            };
        }

        if (cacheScheme === 'cacheOnce' && cachedResponse) {
            return {
                status: 'success',
                error: null,
                response: cachedResponse,
            };
        }

        return {
            status: 'idle',
            error: null,
            response: cachedResponse || null,
        };
    };
}

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
