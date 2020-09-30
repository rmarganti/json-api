import { prop } from 'ramda';

import { Attributes } from '../../types';

/**
 * Build a new Resource Object
 *
 * @param type
 * @param attributes
 * @param id
 */
export const buildResourceObject = (
    type: string,
    attributes: Attributes,
    id?: string
) => ({
    attributes,
    id,
    type,
});

/**
 * Return the `type` of a Resource Object
 */
export const type = prop('type');

/**
 * Return the `id` of a Resource Object
 */
export const id = prop('id');
