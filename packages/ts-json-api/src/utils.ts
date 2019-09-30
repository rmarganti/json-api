import { flip, ifElse, map, merge, propEq } from 'ramda';

import { ApiResourceObject } from './classes/ApiResourceObject';
import { ResourceObject } from './types';

/**
 * Converts a Resource Object to an ResourceObject
 *
 * @param resourceObject
 */
export const convertToApiResourceObject = (resourceObject: ResourceObject) =>
    new ApiResourceObject(resourceObject);

/**
 * If an Array is provided, it is converted to an Array of ApiResourceObjects.
 * If a single item is provided, it is converted to an ApiResourceObject
 */
export const convertToApiResourceObjectOrObjects = ifElse(
    Array.isArray,
    map(convertToApiResourceObject),
    convertToApiResourceObject
);

/**
 * A predicate that determines if the provided value is defined
 *
 * @param item
 */
export const isDefined = (item: any): boolean => typeof item !== 'undefined';

/**
 * Merge util that moves from left-to-right,
 * useful for merging small data sets into larger
 * data collections
 */
export const mergeReverse = flip(merge);

/**
 * Determines if the provided Resource Object has the given ID
 *
 * @param id
 */
export const hasGivenId = (id: string) => propEq('id', id);
