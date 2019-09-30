import axios, { AxiosError } from 'axios';
import { ActionCreator } from 'redux';
import {
    ApiResourceObject,
    ResponseWithData,
    ResponseWithErrors,
} from 'ts-json-api';

import { JasonApiMiddleware, JasonApiMiddlewareApi } from '../types/redux';
import { RequestConfig } from '../types/request';
import {
    extractJsonApiErrorFromAxios,
    stringifyJsonApiErrors,
} from '../utils/async';
import { JASON_API } from './actions/actionTypes';
import {
    addRelationshipToResourceObject,
    JasonApiRequestAction,
    removeRelationshipFromResourceObject,
    removeResourceObject,
    request,
    requestError,
    requestSuccess,
    setRelationshipOnResourceObject,
    updateResourceObject,
} from './actions';

export interface MiddlewareConfig {
    startLoadingActionCreator?: ActionCreator<any>;
    stopLoadingActionCreator?: ActionCreator<any>;
    displayErrorActionCreator?: ActionCreator<any>;
    authenticationExpiredActionCreator?: ActionCreator<any>;
}

export interface Payload {
    [index: string]: any;
}

class JsonApiMiddleware {
    private config: MiddlewareConfig;
    private requestConfig: RequestConfig;
    private store: JasonApiMiddlewareApi;

    constructor(
        config: MiddlewareConfig = {},
        store: JasonApiMiddlewareApi,
        action: JasonApiRequestAction
    ) {
        this.config = config;
        this.store = store;

        this.requestConfig = action[JASON_API];
    }

    /**
     * Intercept `REQUEST` type actions
     * and let others bubble through
     */
    public executeMiddleware() {
        this.store.dispatch(request(this.requestConfig));

        if (
            !this.requestConfig.disableStartLoadingActionCreator &&
            this.config.startLoadingActionCreator
        ) {
            this.store.dispatch(this.config.startLoadingActionCreator());
        }

        const payload =
            this.requestConfig.payload instanceof ApiResourceObject
                ? this.requestConfig.payload && {
                      data: this.requestConfig.payload.toJSON(),
                  }
                : this.requestConfig.payload;

        return this.executeRequest(payload);
    }

    /**
     * Make the request and handle the response
     *
     * @param payload
     */
    private async executeRequest(payload?: Payload) {
        const networkCall = this.buildNetworkCall(payload);

        try {
            const response = await networkCall;
            const data = response.data;

            const transformedData = this.requestConfig.transformer
                ? this.requestConfig.transformer(data)
                : data;

            if (
                !this.requestConfig.disableStartLoadingActionCreator &&
                this.config.stopLoadingActionCreator
            ) {
                this.store.dispatch(this.config.stopLoadingActionCreator());
            }

            this.finishLoading(transformedData);
            this.executeOnSuccessActions(transformedData);

            if (this.requestConfig.onSuccess) {
                this.requestConfig.onSuccess(transformedData, this.store);
            }

            return transformedData;
        } catch (error) {
            const errorJson = extractJsonApiErrorFromAxios(error);

            if (
                !this.requestConfig.disableStartLoadingActionCreator &&
                this.config.stopLoadingActionCreator
            ) {
                this.store.dispatch(this.config.stopLoadingActionCreator());
            }

            if (
                this.config.authenticationExpiredActionCreator &&
                this.checkForAuthenticationError(error)
            ) {
                this.store.dispatch(
                    this.config.authenticationExpiredActionCreator(error)
                );
            } else {
                this.handleError(errorJson);
                if (
                    this.requestConfig.displayNotificationOnError &&
                    this.config.displayErrorActionCreator
                ) {
                    this.store.dispatch(
                        this.config.displayErrorActionCreator(
                            stringifyJsonApiErrors(errorJson)
                        )
                    );
                }
            }

            throw errorJson;
        }
    }

    private buildNetworkCall(payload?: Payload) {
        return axios.request<ResponseWithData>({
            data: payload,
            headers: {
                Accept: 'application/vnd.api+json',
                ContentType:
                    !(payload instanceof FormData) &&
                    'application/vnd.api+json',
                ...this.requestConfig.additionalHeaders,
            },
            method: this.requestConfig.method,
            url: this.requestConfig.url,
        });
    }

    /**
     * Handle a successful API call, and update the entities store
     *
     * @param response
     */
    private finishLoading(response: ResponseWithData) {
        if (!response || !response.data) {
            return;
        }

        this.store.dispatch(requestSuccess(this.requestConfig, response));
    }

    /**
     * Execute optional onSuccess actions
     *
     * @param response
     */
    private executeOnSuccessActions(response: ResponseWithData) {
        this.requestConfig.setRelationshipOnSuccess &&
            this.requestConfig.setRelationshipOnSuccess.forEach(action => {
                const [
                    resourceType,
                    resourceId,
                    relationshipType,
                    relationshipObject,
                ] = action;
                this.store.dispatch(
                    setRelationshipOnResourceObject(
                        resourceType,
                        resourceId,
                        relationshipType,
                        relationshipObject || response
                    )
                );
            });

        this.requestConfig.addRelationshipOnSuccess &&
            this.requestConfig.addRelationshipOnSuccess.forEach(action => {
                const [
                    resourceType,
                    resourceId,
                    relationshipType,
                    relationshipObject,
                ] = action;
                this.store.dispatch(
                    addRelationshipToResourceObject(
                        resourceType,
                        resourceId,
                        relationshipType,
                        relationshipObject || response
                    )
                );
            });

        this.requestConfig.removeRelationshipOnSuccess &&
            this.requestConfig.removeRelationshipOnSuccess.forEach(action => {
                const [
                    resourceType,
                    resourceId,
                    relationshipType,
                    relationshipId,
                ] = action;
                this.store.dispatch(
                    removeRelationshipFromResourceObject(
                        resourceType,
                        resourceId,
                        relationshipType,
                        relationshipId
                    )
                );
            });

        this.requestConfig.removeResourceObjectOnSuccess &&
            this.requestConfig.removeResourceObjectOnSuccess.forEach(action => {
                const [resourceType, resourceId] = action;
                this.store.dispatch(
                    removeResourceObject(resourceType, resourceId)
                );
            });

        this.requestConfig.updateResourceObjectOnSuccess &&
            this.requestConfig.updateResourceObjectOnSuccess.forEach(action => {
                const [resourceType, resourceId, payload] = action;
                this.store.dispatch(
                    updateResourceObject(resourceType, resourceId, payload)
                );
            });
    }

    /**
     * Handle a failed API call, and update the entities store
     *
     * @param error
     */
    private handleError(errorBody: ResponseWithErrors) {
        this.store.dispatch(requestError(this.requestConfig, errorBody));

        if (this.requestConfig.onError) {
            this.requestConfig.onError(errorBody, this.store);
        }
    }

    /**
     * Check to see if the provide error is an Authentication expired error
     *
     * @param error
     */
    private checkForAuthenticationError(error: AxiosError): boolean {
        return (error.response && error.response.status === 401) || false;
    }
}

/**
 * Handle JasonAPI meta actions.
 *
 * @param dispatch
 */
export const middlewareFactory = (
    config: MiddlewareConfig = {}
): JasonApiMiddleware => store => next => action => {
    if (!action[JASON_API]) {
        return next(action);
    }

    const jsonApiMiddleware = new JsonApiMiddleware(config, store, action);
    return jsonApiMiddleware.executeMiddleware();
};

export const middleware = middlewareFactory();
