import { Meta, ResourceObject } from 'ts-json-api';

import { ResponseShape } from './request';

export interface ResourceObjectCollection {
    meta: Meta;
    byId: {
        [index: string]: ResourceObject;
    };
}

export interface StateWithJasonApi {
    jasonApi: JasonApiState;
}

export interface JasonApiState {
    resourceObjects: ResourceObjectsState;
    queries: QueriesState;
}

export interface ResourceObjectsState {
    [index: string]: ResourceObjectCollection;
}

export interface QueriesState {
    [index: string]: ResponseShape;
}
