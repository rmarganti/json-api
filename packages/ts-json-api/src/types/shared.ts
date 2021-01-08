/**
 * An index of Links.
 */
export interface Links {
    [index: string]: string | LinkObject;
}

export interface PaginationLinks {
    first?: string | LinkObject | null;
    last?: string | LinkObject | null;
    prev?: string | LinkObject | null;
    next?: string | LinkObject | null;
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
