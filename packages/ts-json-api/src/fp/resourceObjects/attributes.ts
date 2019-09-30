/**
 * Attribute-related functions. Only applies to a single Resource Object.
 */

import { assocPath, curry, lensProp, over, path, pathOr, prop } from 'ramda';

import { Attributes, ResourceObject } from '../../types';
import { mergeReverse } from '../../utils';

/**
 * Return all attributes.
 *
 * @param resourceObject
 */
export const attributes = (resourceObject: ResourceObject) =>
    prop('attributes', resourceObject);

/**
 * Return a single Attribute value.
 *
 * @param attributeName
 * @param resourceObject
 */
export const attribute = curry(
    (attributeName: string, resourceObject: ResourceObject) =>
        path(['attributes', attributeName], resourceObject)
);

/**
 * Return a single Attribute value, with a default fallback.
 *
 * @param attributeName
 * @param resourceObject
 */
export const attributeOr = curry(
    (
        defaultValue: any,
        attributeName: string,
        resourceObject: ResourceObject
    ) => pathOr(defaultValue, ['attributes', attributeName], resourceObject)
);

/**
 * Set the value of an attribute.
 *
 * @param value
 * @param attributeName
 * @param resourceObject
 */
export const setAttribute = curry(
    (attributeName: string, value: any, resourceObject: ResourceObject) =>
        assocPath(['attributes', attributeName], value, resourceObject)
);

/**
 * Update the attributes of the Resource Object
 *
 * @param payload
 * @param resourceObject
 */
export const updateAttributes = curry(
    (payload: Attributes = {}, resourceObject: ResourceObject) =>
        over(lensProp('attributes'), mergeReverse(payload), resourceObject)
);
