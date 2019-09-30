import {
    append,
    curry,
    path,
    lensPath,
    over,
    propOr,
    reject,
    set
} from 'ramda';

import { ResourceObject } from '../../types';
import { hasGivenId } from '../../utils';

/**
 * Return all relationships
 *
 * @param resourceObject
 */
export const relationships = (resourceObject: ResourceObject) =>
    propOr({}, 'relationships', resourceObject);

/**
 * Return a single Relationship value
 *
 * @param relationshipName
 * @param resourceObject
 */
export const relationship = curry(
    (relationshipName: string, resourceObject: ResourceObject) =>
        path(['relationships', relationshipName], resourceObject)
);

/**
 * Return a single Relationship value
 *
 * @param relationshipName
 * @param resourceObject
 */
export const relationshipData = curry(
    (relationshipName: string, resourceObject: ResourceObject) =>
        path(['relationships', relationshipName, 'data'], resourceObject)
);

/**
 * Add a relationship to the Resource Object by type and id
 *
 * @param relationshipName
 * @param type
 * @param id
 * @param resourceObject
 */
export const addRelationship = curry(
    (
        relationshipName: string,
        type: string,
        id: string,
        resourceObject: ResourceObject
    ) =>
        over(
            lensPath(['relationships', relationshipName, 'data']),
            append({ type, id }),
            resourceObject
        )
);

/**
 * Removes a relationship from the Resource Object
 *
 * @param type
 * @param id
 * @param resourceObject
 */
export const removeRelationship = curry(
    (type: string, id: string, resourceObject: ResourceObject) =>
        over(
            lensPath(['relationships', type, 'data']),
            reject(hasGivenId(id)),
            resourceObject
        )
);

/**
 * Set a to-one relationship to the given type and id
 *
 * @param relationship
 * @param type
 * @param id
 * @param resourceObject
 */
export const setRelationship = curry(
    (
        relationship: string,
        type: string,
        id: string,
        resourceObject: ResourceObject
    ) =>
        set(
            lensPath(['relationships', relationship, 'data']),
            { type, id },
            resourceObject
        )
);
