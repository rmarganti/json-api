import { ResponseWithErrors } from 'ts-json-api';

export class JSONAPIError extends Error {
    readonly response: ResponseWithErrors;

    constructor(message: string, response: ResponseWithErrors) {
        super(message);
        this.response = response;
    }
}
