/**
 * A single Link.
 */
export type Link = string | LinkObject;

/**
 * An index of Links.
 */
export interface Links {
    [index: string]: Link;
}

/**
 * Top level pagination Links.
 */
export interface PaginationLinks {
    first?: Link | null;
    last?: Link | null;
    prev?: Link | null;
    next?: Link | null;
}

/**
 * The top level Links.
 */
export type TopLevelLinks = Links & PaginationLinks;


/**
 * The top level jsonapi member.
 * @see https://jsonapi.org/format/#document-jsonapi-object
 */
export interface TopLevelJsonApi {
    version?: string;
    meta?: Meta;
}


/**
 * A Link.
 */
export interface LinkObject {
    href: string;
    meta?: Meta;
}

/**
 * An index of Meta data.
 */
export interface Meta {
    [index: string]: any;
}
