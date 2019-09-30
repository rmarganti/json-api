import { Action as BaseAction, Middleware, MiddlewareAPI } from 'redux';
import { ResourceObjectOrObjects, Response } from 'ts-json-api';

import * as actions from '../redux/actions/actions';
import { JasonApiRequestAction } from '../redux/actions/jasonApiRequest';
import { ActionsUnion } from './other';
import { StateWithJasonApi } from './state';

export type JasonApiAction = ActionsUnion<typeof actions>;

export interface JasonApiDispatch {
    <Action extends BaseAction>(action: Action): Action;
    <Data extends ResourceObjectOrObjects>(
        metaAction: JasonApiRequestAction<Data>
    ): Promise<Response<Data>>;
}

export type JasonApiMiddleware = Middleware<JasonApiDispatch>;

export type JasonApiGetState<State extends StateWithJasonApi> = () => State;

export type JasonApiMiddlewareApi<
    Dispatch extends JasonApiDispatch = JasonApiDispatch,
    State extends StateWithJasonApi = StateWithJasonApi
> = MiddlewareAPI<Dispatch, State>;
