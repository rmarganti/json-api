import { ResponseWithErrors } from 'ts-json-api';

export const errorResponse: ResponseWithErrors = {
    errors: [
        {
            status: '404',
            title: 'Not Found',
            detail: 'The requested Article was not found.',
        },
    ],
};
