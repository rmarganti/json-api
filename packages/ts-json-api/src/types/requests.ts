import { NewResourceObject, ResourceObject } from './resourceObjects';
import { Links, Meta } from './shared';

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
    links?: Links;
    errors?: [Error];
    meta?: Meta;
}
