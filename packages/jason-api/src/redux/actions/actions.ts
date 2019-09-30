import pluralize from 'pluralize';
import { Attributes, ResponseWithData, ResponseWithErrors } from 'ts-json-api';

import { FlexiblePayload } from '../../types/other';
import { RequestConfig } from '../../types/request';
import { createAction } from '../../utils/actions';
import * as actionTypes from './actionTypes';

/**
 * An API request was initiated.
 */
export const request = (config: RequestConfig) =>
    createAction(actionTypes.REQUEST, config);

/**
 * An API request was successful.
 */
export const requestSuccess = (
    requestConfig: RequestConfig,
    response: ResponseWithData
) =>
    createAction(actionTypes.REQUEST_SUCCESS, {
        requestConfig,
        response,
    });

/**
 * An API request resulted in an error.
 */
export const requestError = (
    requestConfig: RequestConfig,
    response: ResponseWithErrors
) =>
    createAction(actionTypes.REQUEST_ERROR, {
        requestConfig,
        response,
    });

/**
 * Load a JSON API response into the state
 *
 * @param data
 */
export const loadJsonApiResourceObjectData = (data: FlexiblePayload) =>
    createAction(actionTypes.LOAD_DATA, data);

/**
 * Add a relationship to an ResourceObject
 *
 * @param  resourceType
 * @param  resourceId
 * @param  relationshipKey
 * @param  relationshipObject
 */
export const addRelationshipToResourceObject = (
    resourceType: string,
    resourceId: string,
    relationshipKey: string,
    relationshipObject: FlexiblePayload
) =>
    createAction(actionTypes.ADD_RELATIONSHIP, {
        resourceType: pluralize(resourceType),
        resourceId,
        relationshipKey,
        relationshipObject,
    });

/**
 * Set a relationship on an ResourceObject
 *
 * @param resourceType
 * @param resourceId
 * @param relationshipKey
 * @param relationshipId
 */
export const setRelationshipOnResourceObject = (
    resourceType: string,
    resourceId: string,
    relationshipKey: string,
    relationshipObject: FlexiblePayload
) =>
    createAction(actionTypes.SET_RELATIONSHIP, {
        resourceType: pluralize(resourceType),
        resourceId,
        relationshipKey,
        relationshipObject,
    });

/**
 * Remove a relationship from an ResourceObject
 *
 * @param  resourceType
 * @param  resourceId
 * @param  relationshipKey
 * @param  relationshipId
 */
export const removeRelationshipFromResourceObject = (
    resourceType: string,
    resourceId: string,
    relationshipKey: string,
    relationshipId: string
) =>
    createAction(actionTypes.REMOVE_RELATIONSHIP, {
        resourceType: pluralize(resourceType),
        resourceId,
        relationshipKey,
        relationshipId,
    });

/**
 * Completely remove a relationship from a ResourceObject
 *
 * @param resourceType
 * @param resourceId
 * @param relationshipKey
 */
export const clearRelationshipOnResourceObject = (
    resourceType: string,
    resourceId: string,
    relationshipKey: string
) =>
    createAction(actionTypes.CLEAR_RELATIONSHIP, {
        resourceType: pluralize(resourceType),
        resourceId,
        relationshipKey,
    });

/**
 * Update an ResourceObject's attributes
 *
 * @param  resourceType
 * @param  resourceId
 * @param  data
 */
export const updateResourceObject = (
    resourceType: string,
    resourceId: string,
    data: Attributes
) =>
    createAction(actionTypes.UPDATE_RESOURCE_OBJECT, {
        resourceType: pluralize(resourceType),
        resourceId,
        data,
    });

/**
 * Update an ResourceObject group's meta data
 *
 * @param  resourceType
 * @param  metaKey
 * @param  value
 */
export const updateResourceObjectsMeta = (
    resourceType: string,
    metaKey: string | null,
    value: any
) =>
    createAction(actionTypes.UPDATE_RESOURCE_OBJECTS_META, {
        resourceType: pluralize(resourceType),
        metaKey,
        value,
    });

/**
 * Update an ResourceObject's meta data
 *
 * @param  resourceType
 * @param  resourceId
 * @param  metaKey
 * @param  value
 */
export const updateResourceObjectMeta = (
    resourceType: string,
    resourceId: string,
    metaKey: string | null,
    value: any
) =>
    createAction(actionTypes.UPDATE_RESOURCE_OBJECT_META, {
        resourceType: pluralize(resourceType),
        resourceId,
        metaKey,
        value,
    });

/**
 * Remove a single ResourceObject

 * @param  resourceType
 * @param  resourceId
 */
export const removeResourceObject = (
    resourceType: string,
    resourceId: string
) =>
    createAction(actionTypes.REMOVE_RESOURCE_OBJECT, {
        resourceType: pluralize(resourceType),
        resourceId,
    });

/**
 * Clear all the ResourceObjects from an ResourceObject type
 *
 * @param  resourceType
 */
export const clearResourceObjectType = (resourceType: string) =>
    createAction(actionTypes.CLEAR_RESOURCE_OBJECT_TYPE, {
        resourceType: pluralize(resourceType),
    });
