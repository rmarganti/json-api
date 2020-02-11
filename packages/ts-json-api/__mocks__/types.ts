import { Relationship, ResourceObject, ResponseWithData } from '../src/types';

export interface Article extends ResourceObject {
    type: 'articles';
    attributes: {
        title: string;
    };
    relationships: {
        author: Relationship<Person>;
        comments: Relationship<Comment[]>;
    };
}

export type ArticleItemResponse = ResponseWithData<Article>;
export type ArticleCollectionResponse = ResponseWithData<Article[]>;

export interface Person extends ResourceObject {
    type: 'people';
    attributes: {
        firstName: string;
        lastName: string;
        twitter: string;
    };
}

export interface Comment extends ResourceObject {
    type: 'comments';
    attributes: {
        body: string;
    };
}
