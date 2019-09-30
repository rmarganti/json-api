import { Response } from 'ts-json-api';

import { CommentResource } from './types';

export const commentsResponse: Response<CommentResource[]> = {
    data: [
        {
            type: 'comments',
            id: '42',
            attributes: {
                body: 'Banana!',
            },
            relationships: {
                author: {
                    data: {
                        type: 'people',
                        id: '2',
                    },
                },
            },
            links: {
                self: 'http://example.com/comments/42',
            },
        },
        {
            type: 'comments',
            id: '44',
            attributes: {
                body: '!ananaB',
            },
            relationships: {
                author: {
                    data: {
                        type: 'people',
                        id: '2',
                    },
                },
            },
            links: {
                self: 'http://example.com/comments/44',
            },
        },
    ],
    included: [
        {
            type: 'people',
            id: '2',
            attributes: {
                firstName: 'Joe',
                lastName: 'Dimagio',
                twitter: 'jdim',
            },
            links: {
                self: 'http://example.com/people/2',
            },
        },
    ],
};
