import { ResponseWithData } from 'ts-json-api';

import { CommentResource } from './types';

export const commentResponse: ResponseWithData<CommentResource> = {
    data: {
        type: 'comments',
        id: '44',
        attributes: {
            body: 'This is a terrible comment',
        },
        relationships: {
            author: {
                data: {
                    type: 'people',
                    id: '9',
                },
            },
        },
    },
};
