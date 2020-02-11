import * as faker from 'faker';
import { ResponseWithData } from 'ts-json-api';

import { Comment } from '../src/types';

export const mockCommentResponse = (): [number, ResponseWithData<Comment>] => {
    const commentId = `${faker.random.number(200)}`;
    const authorId = `${faker.random.number(200)}`;

    return [
        200,
        {
            data: {
                type: 'comments',
                id: commentId,
                attributes: {
                    body: faker.random.words(10),
                },
                relationships: {
                    author: {
                        data: {
                            type: 'people',
                            id: authorId,
                        },
                    },
                },
                links: {
                    self: `http://example.com/comments/${commentId}`,
                },
            },
            included: [
                {
                    type: 'people',
                    id: authorId,
                    attributes: {
                        firstName: faker.name.firstName(),
                        lastName: faker.name.lastName(),
                        twitter: faker.internet.userName(),
                    },
                    links: {
                        self: `http://example.com/people/${authorId}`,
                    },
                },
            ],
        },
    ];
};
