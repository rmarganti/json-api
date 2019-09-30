import { ResourceObjectOrObjects } from 'ts-json-api';

import { JasonApiDispatch } from '../../types/redux';
import { RequestConfig } from '../../types/request';
import { StateWithJasonApi } from '../../types/state';
import { JASON_API } from './actionTypes';

const defaultRequestConfig: Partial<RequestConfig> = {
    method: 'get',
};

export interface JasonApiRequestAction<
    Data extends ResourceObjectOrObjects = ResourceObjectOrObjects,
    Dispatch extends JasonApiDispatch = JasonApiDispatch,
    State extends StateWithJasonApi = StateWithJasonApi
> {
    [JASON_API]: RequestConfig<Data, Dispatch, State>;
}

/**
 * Initialize a Request to be handled by the middleware.
 */
export const jasonApiRequest = <
    Data extends ResourceObjectOrObjects = ResourceObjectOrObjects,
    Dispatch extends JasonApiDispatch = JasonApiDispatch,
    State extends StateWithJasonApi = StateWithJasonApi
>(
    config: RequestConfig<Data, Dispatch, State>
): JasonApiRequestAction<Data, Dispatch, State> => ({
    [JASON_API]: Object.assign({}, defaultRequestConfig, config),
});
