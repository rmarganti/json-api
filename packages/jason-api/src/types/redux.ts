import { Action as BaseAction, Middleware, MiddlewareAPI } from 'redux';

import * as actions from '../redux/actions/actions';
import { ResponseShape } from '../types/request';
import { ActionsUnion } from './other';
import { StateWithJasonApi } from './state';

export type JasonApiAction = Exclude<
    ActionsUnion<typeof actions>,
    actions.JasonApiRequestAction
>;

export interface JasonApiDispatch {
    <Action extends BaseAction>(action: Action): Action;
    <Data = any>(metaAction: actions.JasonApiRequestAction<Data>): Promise<
        ResponseShape<Data>
    >;
}

export type JasonApiMiddleware = Middleware<JasonApiDispatch>;

export type JasonApiGetState<State extends StateWithJasonApi> = () => State;

export type JasonApiMiddlewareApi<
    Dispatch extends JasonApiDispatch = JasonApiDispatch,
    State extends StateWithJasonApi = StateWithJasonApi
> = MiddlewareAPI<Dispatch, State>;

export type ReduxInitAction = BaseAction<'@@INIT'>;
