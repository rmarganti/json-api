// External dependencies
import { ResponseWithErrors } from 'ts-json-api';

// Internal dependencies
import { ResponseShape } from '../../../types/request';

type Status = 'idle' | 'loading' | 'success' | 'error';

interface BaseState<Data = any> {
    status: Status;
    error: ResponseWithErrors | null;
    response: ResponseShape<Data> | null;
}

export type UseRequestState<Data = any> =
    | IdleState<Data>
    | LoadingState<Data>
    | SuccessState<Data>
    | ErrorState<Data>;

export interface IdleState<Data = any> extends BaseState<Data> {
    status: 'idle';
}

export interface LoadingState<Data = any> extends BaseState<Data> {
    status: 'loading';
    error: null;
}

export interface SuccessState<Data = any> extends BaseState<Data> {
    status: 'success';
    error: null;
    response: ResponseShape<Data>;
}

export interface ErrorState<Data = any> extends BaseState<Data> {
    status: 'error';
    error: ResponseWithErrors;
}

export interface UseRequestActions<Data = any> {
    cacheChanged: (cachedResponse?: ResponseShape<Data>) => void;
    requestError: (response: ResponseWithErrors) => void;
    requestMade: () => void;
    requestSuccess: (response: ResponseShape<Data>) => void;
}
