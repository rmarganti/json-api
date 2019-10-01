import * as faker from 'faker';
import { Response } from 'ts-json-api';

import { Article } from '../src/types';

export const mockArticleResponse = (): [number, Response<Article>] => {
    const articleId = `${faker.random.number(200)}`;
    const authorId1 = `${faker.random.number(200)}`;
    const authorId2 = `${faker.random.number(200)}`;
    const commentId1 = `${faker.random.number(200)}`;
    const commentId2 = `${faker.random.number(200)}`;

    return [
        200,
        {
            links: {
                self: `http://example.com/articles/${articleId}`,
            },
            data: {
                type: 'articles',
                id: articleId,
                attributes: {
                    title: faker.random.words(8),
                    body: faker.lorem.paragraphs(3),
                },
                relationships: {
                    author: {
                        links: {
                            self:
                                'http://example.com/articles/1/relationships/author',
                            related: 'http://example.com/articles/1/author',
                        },
                        data: {
                            type: 'people',
                            id: authorId1,
                        },
                    },
                    comments: {
                        links: {
                            self: `http://example.com/articles/${articleId}/relationships/comments`,
                            related: `http://example.com/articles/${articleId}/comments`,
                        },
                        data: [
                            {
                                type: 'comments',
                                id: commentId1,
                            },
                            {
                                type: 'comments',
                                id: commentId2,
                            },
                        ],
                    },
                },
                links: {
                    self: `http://example.com/articles/${articleId}`,
                },
            },
            included: [
                {
                    type: 'people',
                    id: authorId1,
                    attributes: {
                        firstName: faker.name.firstName(),
                        lastName: faker.name.lastName(),
                        twitter: faker.internet.userName(),
                    },
                    links: {
                        self: `http://example.com/people/${authorId1}`,
                    },
                },
                {
                    type: 'people',
                    id: authorId2,
                    attributes: {
                        firstName: faker.name.firstName(),
                        lastName: faker.name.lastName(),
                        twitter: faker.internet.userName(),
                    },
                    links: {
                        self: `http://example.com/people/${authorId2}`,
                    },
                },
                {
                    type: 'comments',
                    id: commentId1,
                    attributes: {
                        body: faker.random.words(5),
                    },
                    relationships: {
                        author: {
                            data: {
                                type: 'people',
                                id: authorId1,
                            },
                        },
                    },
                    links: {
                        self: `http://example.com/comments/${commentId1}`,
                    },
                },
                {
                    type: 'comments',
                    id: commentId2,
                    attributes: {
                        body: faker.random.words(5),
                    },
                    relationships: {
                        author: {
                            data: {
                                type: 'people',
                                id: authorId2,
                            },
                        },
                    },
                    links: {
                        self: `http://example.com/comments/${commentId2}`,
                    },
                },
            ],
        },
    ];
};
