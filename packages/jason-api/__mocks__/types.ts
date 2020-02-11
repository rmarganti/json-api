import { ResourceObject, Relationship } from 'ts-json-api';

export interface ArticleResource extends ResourceObject {
    type: 'articles';
    attributes: {
        title: string;
    };
    relationships: {
        author: Relationship<PeopleResource>;
        comments: Relationship<CommentResource[]>;
    };
}

export interface CommentResource extends ResourceObject {
    type: 'comments';
    attributes: {
        body: string;
    };
    relationships: {
        author: Relationship<PeopleResource>;
    };
}

export interface PeopleResource extends ResourceObject {
    type: 'people';
    attributes: {
        firstName: string;
        lastName: string;
        twitter: string;
    };
}
