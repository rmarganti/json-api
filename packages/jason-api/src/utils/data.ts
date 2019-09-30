import {
    append,
    concat,
    curryN,
    ifElse,
    flip,
    has,
    identity,
    lensProp,
    map,
    mergeDeepRight,
    omit,
    over,
    pick,
    pipe,
    prop,
} from 'ramda';

/**
 * Type guard that asserts that a value is `undefined`.
 */
export const isUndefined = (value: unknown): value is undefined =>
    typeof value === 'undefined';

/**
 * Ensure the given value is an array. If not,
 * return it as a single-item array.
 *
 * @param value
 */
export const ensureArray = ifElse(Array.isArray, identity, value => [value]);

/**
 * Ramda's mergeDeepRight with parameter order flipped.
 */
export const reverseMergeDeepLeft = flip(mergeDeepRight);

/**
 * Remove an object's wrapping `data` prop, if it exists.
 */
export const unwrapDataProp = ifElse(has('data'), prop('data'), identity);

/**
 * Apply a function in a map if the given data is an array.
 * Otherwise, simply apply it once to the data.
 *
 * @param func Function to perform
 */
export const mapOrOnce = curryN(2, (func: (input: any) => any, value: any) =>
    ifElse(Array.isArray, map(func), func)(value)
);

/**
 * If the given data is an array, concat it.
 * If it is a single item, append it.
 */
export const appendOrConcat = ifElse(Array.isArray, concat, append);

/**
 * Simplify a single Resource Object
 * to only its type and ID
 *
 * Object -> Object
 */
export const simplifyResourceObject = ifElse(
    isUndefined,
    identity,
    pick(['type', 'id'])
);

/**
 * Simplify a single Resource Object or array of
 * Resource Objects to only its/their ID/ID's
 *
 * a -> a
 */
export const simplifyResourceObjects = mapOrOnce(simplifyResourceObject);

/**
 * Give a JSON API Response, simplify the Resource Objects
 * and strip any additional `included` Resource Objects.
 *
 * Object -> Object
 */
export const simplifyJsonApi = pipe(
    over(lensProp('data'), simplifyResourceObjects),
    omit(['included'])
);

/**
 * Generate a unique hash from any javascript object.
 *
 * @param object
 */
export const hashObject = (object: any): string => {
    const stringified = JSON.stringify(object, (_, value) =>
        typeof value === 'function' ? value.toString() : value
    );

    let hash = 0,
        i,
        chr;

    if (stringified.length === 0) return hash.toString();

    for (i = 0; i < stringified.length; i++) {
        chr = stringified.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0; // Convert to 32bit integer
    }

    return hash.toString();
};
