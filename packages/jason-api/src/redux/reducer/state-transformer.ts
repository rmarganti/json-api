// External dependencies
import {
    assocPath,
    concat,
    dissoc,
    dissocPath,
    has,
    lensPath,
    over,
    pipe,
    propEq,
    propOr,
    reduce,
    reject,
    set,
} from 'ramda';
import { Attributes, ResourceObject, ResourceObjects } from 'ts-json-api';

// Internal dependencies
import { FlexiblePayload } from '../../types/other';
import { ResourceObjectsState } from '../../types/state';
import {
    appendOrConcat,
    ensureArray,
    mapOrOnce,
    reverseMergeDeepLeft,
    simplifyResourceObject,
    unwrapDataProp,
} from '../../utils/data';

/**
 * Insert an ResourceObject or group of ResourceObjects
 * into the state as well as any includes
 *
 * @param state
 * @param payload
 */
export const insertOrUpdateResourceObjects = (payload: FlexiblePayload) => (
    state: ResourceObjectsState
): ResourceObjectsState => {
    const included: ResourceObjects = propOr([], 'included', payload);

    return pipe(
        unwrapDataProp,
        ensureArray,
        concat(included),
        reduce(
            (carrier: ResourceObjectsState, resourceObject: ResourceObject) =>
                insertOrUpdateResourceObject(resourceObject)(carrier),
            state
        )
    )(payload);
};

/**
 * Insert a single ResourceObject into the state
 *
 * @param state
 * @param entity
 */
const insertOrUpdateResourceObject = (entity: ResourceObject) => (
    state: ResourceObjectsState
): ResourceObjectsState => {
    validateResourceObject(entity);

    if (!entity.id) {
        throw new Error('ResourceObjects must have an id');
    }

    return over(
        lensPath([entity.type, 'byId', entity.id]),
        reverseMergeDeepLeft(entity),
        state
    );
};

/**
 * Ensure that an ResourceObject is well-formed
 *
 * @param  entity
 */
const validateResourceObject = (entity: ResourceObject) => {
    if (!('type' in entity)) {
        throw new Error(
            'JSON API resource objects must have a `type` property'
        );
    }

    if (!('id' in entity)) {
        throw new Error('JSON API resource objects must have an `id` property');
    }
};

/**
 * Insert an ResourceObject into the state and
 * add it as a relationship to another ResourceObject
 *
 * @param initialState
 * @param resourceType
 * @param resourceId
 * @param relationshipKey
 * @param relationshipObject  Can be either a valid JSON API object or a string ID
 */
export const addRelationshipToResourceObject = (
    resourceType: string,
    resourceId: string,
    relationshipKey: string,
    relationshipObject: FlexiblePayload
) => (state: ResourceObjectsState): ResourceObjectsState => {
    const unwrappedRelationshipObject = unwrapDataProp(relationshipObject);
    const newState = insertOrUpdateResourceObjects(unwrappedRelationshipObject)(
        state
    );

    const simplifiedResourceObjects = mapOrOnce(
        simplifyResourceObject,
        unwrappedRelationshipObject
    );

    return over(
        lensPath([
            resourceType,
            'byId',
            resourceId,
            'relationships',
            relationshipKey,
            'data',
        ]),
        appendOrConcat(simplifiedResourceObjects),
        newState
    );
};

/**
 * Remove a relationship an ResourceObject
 *
 * @param  initialState
 * @param  resourceType  Type of entity on which to set relationship
 * @param  resourceId  ID of entity on which to set relationship
 * @param  relationshipKey  Name of the relationship
 * @param  relationshipId  Id of the relationship object
 */
export const removeRelationshipFromResourceObject = (
    resourceType: string,
    resourceId: string,
    relationshipKey: string,
    relationshipId: string
) => (initialState: ResourceObjectsState): ResourceObjectsState => {
    return over(
        lensPath([
            resourceType,
            'byId',
            resourceId,
            'relationships',
            relationshipKey,
            'data',
        ]),
        reject(propEq('id', relationshipId)),
        initialState
    );
};

/**
 * Set a relationship on an ResourceObject to another ResourceObject or ResourceObjects
 *
 * @param initialState
 * @param resourceType  Type of entity on which to set relationship
 * @param resourceId  ID of entity on which to set relationship
 * @param relationshipKey  Name of the relationship
 * @param relationshipObject  Can be a JsonApResponse, a Resource Object, or an array of Resource Objects
 */
export const setRelationshipOnResourceObject = (
    resourceType: string,
    resourceId: string,
    relationshipKey: string,
    relationshipObject: FlexiblePayload
) => (initialState: ResourceObjectsState): ResourceObjectsState => {
    const unwrappedRelationshipObject = unwrapDataProp(relationshipObject);
    const newState = insertOrUpdateResourceObjects(unwrappedRelationshipObject)(
        initialState
    );

    return set(
        lensPath([
            resourceType,
            'byId',
            resourceId,
            'relationships',
            relationshipKey,
            'data',
        ]),
        mapOrOnce(simplifyResourceObject, unwrappedRelationshipObject),
        newState
    );
};

/**
 * Completely clear a relationship type on an entity
 *
 * @param resourceType Type of entity who owns the relationship
 * @param resourceId  Id of entity who owns the relationship
 * @param relationshipKey Name of relationship to clear
 * @param state
 */
export const clearRelationshipOnResourceObject = (
    resourceType: string,
    resourceId: string,
    relationshipKey: string
) => (state: ResourceObjectsState): ResourceObjectsState =>
    dissocPath(
        [resourceType, 'byId', resourceId, 'relationships', relationshipKey],
        state
    );

/**
 * Update an ResourceObject's attributes
 *
 * @param  state
 * @param  resourceType
 * @param  resourceId
 * @param  data
 */
export const updateResourceObject = (
    resourceTypeOrResourceObject: string | ResourceObject,
    resourceId?: string,
    data?: ResourceObject | Attributes
) => (state: ResourceObjectsState) => {
    if (
        typeof resourceTypeOrResourceObject !== 'string' &&
        has('type', resourceTypeOrResourceObject) &&
        has('id', resourceTypeOrResourceObject)
    ) {
        return insertOrUpdateResourceObject(resourceTypeOrResourceObject)(
            state
        );
    }

    if (!resourceId) {
        throw new Error('`resourceId` must be defined.');
    }

    if (!data) {
        throw new Error('`data` must be defined.');
    }

    return over(
        lensPath([
            resourceTypeOrResourceObject as string,
            'byId',
            resourceId,
            'attributes',
        ]),
        reverseMergeDeepLeft(data),
        state
    );
};

/**
 * Update the meta data for an ResourceObject group
 *
 * @param  state
 * @param  resourceType
 * @param  metaKey
 * @param  value
 */
export const updateResourceObjectsMeta = (
    resourceType: string,
    metaKey: string | null,
    value: any
) => (state: ResourceObjectsState): ResourceObjectsState =>
    metaKey
        ? assocPath([resourceType, 'meta', metaKey], value, state)
        : assocPath([resourceType, 'meta'], value, state);

/**
 * Update the meta data for an ResourceObject
 *
 * @param  state
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
) => (state: ResourceObjectsState): ResourceObjectsState =>
    metaKey
        ? assocPath(
              [resourceType, 'byId', resourceId, 'meta', metaKey],
              value,
              state
          )
        : assocPath([resourceType, 'byId', resourceId, 'meta'], value, state);

/**
 * Remove a single ResourceObject
 *
 * @param  state
 * @param  resourceType
 * @param  resourceId
 */
export const removeResourceObject = (
    resourceType: string,
    resourceId: string
) => (state: ResourceObjectsState): ResourceObjectsState =>
    dissocPath([resourceType, 'byId', resourceId], state);

/**
 * Clear all of the ResourceObjects out of an ResourceObject type
 *
 * @param  state
 * @param  resourceType
 */
export const clearResourceObjectType = (resourceType: string) => (
    state: ResourceObjectsState
): ResourceObjectsState => dissoc(resourceType, state);
