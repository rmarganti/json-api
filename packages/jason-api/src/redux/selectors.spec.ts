import {
    getResourceObject,
    getResourceObjects,
    getResourceObjectsMeta,
    getResourceObjectMeta,
    getCachedQuery,
} from './selectors';

import { defaultState } from '../../__mocks__';

const state = { jasonApi: defaultState };

describe('getResourceObject', () => {
    it('should return an resource object', () => {
        const resourceObject = getResourceObject(state, 'article', '1')!;

        expect(resourceObject.id).toEqual('1');
        expect(resourceObject.type).toEqual('articles');
        expect(resourceObject.attributes).toEqual({
            title: 'JSON API paints my bikeshed!',
        });
    });

    it('should return `undefined` if the resource object does not exist', () => {
        const resourceObject = getResourceObject(state, 'article', '666');
        expect(resourceObject).toBeUndefined();
    });
});

describe('getResourceObjects', () => {
    it('should return all resource objects', () => {
        const results = getResourceObjects(state, 'comments');

        expect(results[0].attributes).toEqual({
            body: 'First!',
        });

        expect(results[1].attributes).toEqual({
            body: 'I like XML better',
        });
    });

    it('should return a subset of resource objects', () => {
        const results = getResourceObjects(state, 'comments', ['5', '12']);

        expect(results[0].attributes).toEqual({
            body: 'First!',
        });

        expect(results[1].attributes).toEqual({
            body: 'I like XML better',
        });
    });

    it('should return only resource objects that exist', () => {
        const results = getResourceObjects(state, 'comments', ['5', '666']);

        expect(results.length).toEqual(1);
        expect(results[0].attributes).toEqual({
            body: 'First!',
        });
    });

    it('should return an empty array if the resource objects do not exist', () => {
        const invalidIdsResult = getResourceObjects(state, 'comments', [
            '666',
            '777',
        ]);
        expect(invalidIdsResult).toEqual([]);

        const invalidTypeResult = getResourceObjects(state, 'spicyboys');
        expect(invalidTypeResult).toEqual([]);
    });
});

describe('getResourceObjectsMeta', () => {
    it('should return all the meta data for an resource object type', () => {
        const result = getResourceObjectsMeta(state, 'articles');

        expect(result).toEqual({
            isLoading: true,
            anotherMetaProperty: 666,
        });
    });

    it("should return a specific meta property's value for an resource object group", () => {
        const result = getResourceObjectsMeta(state, 'articles', 'isLoading');
        expect(result).toEqual(true);
    });

    it('should return `undefined` if no meta data exists for an resource object group', () => {
        const invalidKeyResult = getResourceObjectsMeta(
            state,
            'articles',
            'invalidMetaKey'
        );
        expect(invalidKeyResult).toEqual(undefined);

        const invalidResourceObjectsResult = getResourceObjectsMeta(
            state,
            'authors'
        );
        expect(invalidResourceObjectsResult).toEqual(undefined);
    });
});

describe('getResourceObjectMeta', () => {
    it('should return all the meta data for an resource object type', () => {
        const result = getResourceObjectMeta(state, 'articles', '1');

        expect(result).toEqual({
            isLoading: true,
        });
    });

    it("should return a specific meta property's value for an resource object group", () => {
        const result = getResourceObjectMeta(
            state,
            'articles',
            '1',
            'isLoading'
        );

        expect(result).toEqual(true);
    });

    it('should return `undefined` if no meta data exists for an resource object group', () => {
        const invalidKeyResult = getResourceObjectMeta(
            state,
            'articles',
            '1',
            'invalidMetaKey'
        );
        expect(invalidKeyResult).toEqual(undefined);

        const invalidResourceObjectResult = getResourceObjectMeta(
            state,
            'authors',
            '1'
        );
        expect(invalidResourceObjectResult).toEqual(undefined);
    });
});

describe('getCachedQuery', () => {
    it('should get a cached query', () => {
        const result = getCachedQuery(state, 'cacheKey');

        expect(result).toEqual({
            data: [{ type: 'articles', id: '1' }],
            links: {
                self: 'http://example.com/articles',
                next: 'http://example.com/articles?page[offset]=2',
                last: 'http://example.com/articles?page[offset]=10',
            },
        });
    });

    it('should fetch and expand a cached query', () => {
        const result = getCachedQuery(state, 'cacheKey', true);

        // @ts-ignore
        expect(result.data[0].attributes.title).toEqual(
            'JSON API paints my bikeshed!'
        );
    });
});
