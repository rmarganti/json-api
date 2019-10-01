// External Dependencies
import { ResourceObject, Relationship } from 'ts-json-api';

export interface ArticleResource extends ResourceObject {
    type: 'articles';
    attributes: {
        title: string;
        body: string;
    };
    relationships: {
        author: Relationship<PersonResource>;
        comments: Relationship<CommentResource[]>;
    };
}

export interface CommentResource extends ResourceObject {
    type: 'comments';
    attributes: {
        body: string;
    };
    relationships: {
        author: Relationship<PersonResource>;
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
