import { NewResourceObject, ResourceObject } from './resourceObjects';
import { Meta, TopLevelLinks } from './shared';

/**
 * A Request to be sent to a JSON API-compliant server.
 */
export interface Request<
    D extends NewResourceObject | NewResourceObject[] =
        | NewResourceObject
        | NewResourceObject[]
> {
    data: D;
    included?: ResourceObject[];
    links?: TopLevelLinks;
    errors?: [Error];
    meta?: Meta;
}
