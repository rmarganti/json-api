import { flip, merge, propEq } from 'ramda';

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
