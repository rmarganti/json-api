import { lensPath, set } from 'ramda';

import { ApiResourceObject } from './ApiResourceObject';
import { ApiResponse } from './ApiResponse';

import { itemResponse } from '../../__mocks__/itemResponse';
import { ArticleItemResponse } from '../../__mocks__/types';

describe('JsonApiResponse', () => {
    let jsonApiResponse: ApiResponse<ArticleItemResponse>;

    beforeEach(() => {
        jsonApiResponse = ApiResponse.of(itemResponse);
    });

    it('builds a new JsonApiResponse', () => {
        expect(jsonApiResponse.hasError()).toBeFalsy();
        expect(jsonApiResponse.errors()).toEqual([]);
        expect(jsonApiResponse.data()).toBeInstanceOf(ApiResourceObject);

        expect(Array.isArray(jsonApiResponse.included())).toBeTruthy();
        expect(jsonApiResponse.included()[0]).toBeInstanceOf(ApiResourceObject);
    });

    it('expands a relationship to the full include', () => {
        // @ts-ignore
        const author = jsonApiResponse.data().relationship('author');
        const expandedAuthor = jsonApiResponse.expandInclude(author);

        expect(expandedAuthor!.attribute('firstName')).toEqual('Dan');
    });

    it('can be mapped over', () => {
        const changeTypeToBooks = set(lensPath(['data', 'type']), 'books');

        const result = jsonApiResponse.map(changeTypeToBooks);
        // @ts-ignore
        expect(result.data().type()).toEqual('books');
    });
});
