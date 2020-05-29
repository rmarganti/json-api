// External Dependencies
import {
    Attributes,
    ResourceObjectOrObjects,
    ResponseWithData,
    ResponseWithErrors,
} from 'ts-json-api';

// Internal Dependencies
import { FlexiblePayload } from './other';
import { JasonApiMiddlewareApi, JasonApiDispatch } from './redux';
import { StateWithJasonApi } from './state';

interface AdditionalHeaders {
    [index: string]: string;
}

interface ErrorCallback<
    Dispatch extends JasonApiDispatch,
    State extends StateWithJasonApi = StateWithJasonApi
> {
    (
        error: ResponseWithErrors,
        store: JasonApiMiddlewareApi<Dispatch, State>
    ): void;
}

interface SuccessCallback<
    Data = any,
    Dispatch extends JasonApiDispatch = JasonApiDispatch,
    State extends StateWithJasonApi = StateWithJasonApi
> {
    (
        response: ResponseShape<Data>,
        store: JasonApiMiddlewareApi<Dispatch, State>
    ): void;
}

interface Transformer<DataOut = any> {
    (response: any): ResponseShape<DataOut>;
}

type SetRelationshipOnSuccess = [string, string, string, FlexiblePayload];

type AddRelationshipOnSuccess = [string, string, string, FlexiblePayload];

type RemoveRelationshipOnSuccess = [string, string, string, string];
type RemoveResourceObjectOnSuccess = [string, string];
type UpdateResourceObjectOnSuccess = [string, string, Attributes];

type Method = 'get' | 'post' | 'patch' | 'delete';

export interface RequestConfig<
    Data = any,
    Dispatch extends JasonApiDispatch = JasonApiDispatch,
    State extends StateWithJasonApi = StateWithJasonApi
> {
    url: string;
    method?: Method;
    payload?: any;
    resourceId?: string;
    resourceType?: string;
    additionalHeaders?: AdditionalHeaders;
    disableStartLoadingActionCreator?: boolean;
    displayNotificationOnError?: boolean;
    onError?: ErrorCallback<Dispatch, State>;
    onSuccess?: SuccessCallback<Data, Dispatch, State>;
    transformer?: Transformer<Data>;
    setRelationshipOnSuccess?: SetRelationshipOnSuccess[];
    addRelationshipOnSuccess?: AddRelationshipOnSuccess[];
    removeRelationshipOnSuccess?: RemoveRelationshipOnSuccess[];
    removeResourceObjectOnSuccess?: RemoveResourceObjectOnSuccess[];
    updateResourceObjectOnSuccess?: UpdateResourceObjectOnSuccess[];
    cacheKey?: string;
}

/**
 * Response shape shorthand. If `T` is a Resource Object or Objects,
 * then the shape of the Response is assumed to be a standard JSON API
 * response, where the `data` properties is `T`. Otherwise, `T` is
 * assumed to be the full shape of the response.
 */
export type ResponseShape<Data = any> = Data extends ResourceObjectOrObjects
    ? ResponseWithData<Data>
    : Data;
