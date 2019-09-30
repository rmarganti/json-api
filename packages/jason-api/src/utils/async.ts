import { AxiosError } from 'axios';
import { ResponseWithErrors } from 'ts-json-api';

/**
 * Extract valid JSON API errors from an Axios error response.
 * If the API * did not return valid JSON API response, build
 * one from the known server/client details.
 *
 * @param error
 */
export const extractJsonApiErrorFromAxios = (
    error: AxiosError
): ResponseWithErrors => {
    if (error.response && error.response.data.errors) {
        return error.response.data;
    } else if (error.request) {
        return {
            errors: [
                {
                    status: error.request.status,
                    detail: error.request.statusText,
                },
            ],
        };
    }

    return {
        errors: [
            {
                detail: error.message,
            },
        ],
    };
};

/**
 * Take an array of Jason API error objects, and concat
 * them into a single, human-readable string.
 *
 * @param errorJson
 */
export const stringifyJsonApiErrors = (errorJson: ResponseWithErrors) =>
    errorJson.errors.map(error => error.detail || error.title).join('\n');
