// External dependencies
import { ResponseWithErrors } from 'ts-json-api';

// Internal dependencies
import { ResponseShape } from '../../../types/request';

type Status = 'idle' | 'loading' | 'success' | 'error';

interface BaseState<T = any> {
    status: Status;
    error?: ResponseWithErrors;
    response?: ResponseShape<T>;
}

export type UseRequestReducerState<T = any> =
    | IdleState
    | LoadingState<T>
    | SuccessState<T>
    | ErrorState;

export interface IdleState extends BaseState {
    status: 'idle';
}

export interface LoadingState<T = any> extends BaseState<T> {
    status: 'loading';
    error: undefined;
    response?: ResponseShape<T>;
}

export interface SuccessState<T = any> extends BaseState<T> {
    status: 'success';
    error: undefined;
    response: ResponseShape<T>;
}

export interface ErrorState extends BaseState {
    status: 'error';
    error: ResponseWithErrors;
}
