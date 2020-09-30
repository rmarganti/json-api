// External Dependencies
import { ResourceObject, Relationship } from 'ts-json-api';

export interface ArticleResource extends ResourceObject {
    type: 'articles';
    attributes: {
        title: string;
        body: string;
    };
    relationships: {
        author: RelationshipWithData<PersonResource>;
        comments: RelationshipWithData<CommentResource[]>;
    };
}

export interface CommentResource extends ResourceObject {
    type: 'comments';
    attributes: {
        body: string;
    };
    relationships: {
        author: RelationshipWithData<PersonResource>;
    };
}

export interface PersonResource extends ResourceObject {
    type: 'people';
    attributes: {
        firstName: string;
        lastName: string;
        twitter: string;
    };
}

type RelationshipWithData<
    D extends ResourceObject | ResourceObject[] =
        | ResourceObject
        | ResourceObject[]
> = WithKnownProperties<Relationship<D>, 'data'>;

type WithKnownProperties<T extends {}, K extends keyof T> = Required<
    Pick<T, K>
> &
    Omit<T, K>;
