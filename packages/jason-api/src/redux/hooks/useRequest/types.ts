// External dependencies
import { ResponseWithErrors } from 'ts-json-api';

// Internal dependencies
import { ResponseShape } from '../../../types/request';

type Status = 'idle' | 'loading' | 'success' | 'error';

interface BaseState<Data = any> {
    status: Status;
    error?: ResponseWithErrors;
    response?: ResponseShape<Data>;
}

export type UseRequestState<Data = any> =
    | IdleState
    | LoadingState<Data>
    | SuccessState<Data>
    | ErrorState;

export interface IdleState<Data = any> extends BaseState<Data> {
    status: 'idle';
}

export interface LoadingState<Data = any> extends BaseState<Data> {
    status: 'loading';
    error: undefined;
    response?: ResponseShape<Data>;
}

export interface SuccessState<Data = any> extends BaseState<Data> {
    status: 'success';
    error: undefined;
    response: ResponseShape<Data>;
}

export interface ErrorState extends BaseState {
    status: 'error';
    error: ResponseWithErrors;
}

export interface UseRequestActions<Data = any> {
    requestError: (response: ResponseWithErrors) => void;
    requestMade: () => void;
    requestSuccess: (response: ResponseShape<Data>) => void;
}
