// External dependencies
import R from 'ramda';
import { ResourceObject } from 'ts-json-api';

// Internal dependencies
import * as actionTypes from '../../actions/actionTypes';
import { resourceObjects } from './resourceObjects';

// Testing dependencies
import { commentResponse, articlesResponse } from '__mocks__';

const initialExpectedState = resourceObjects(
    {},
    {
        type: actionTypes.LOAD_DATA,
        payload: articlesResponse,
    }
);

describe('reducer', () => {
    it('should return the initial state', () => {
        const result = resourceObjects(undefined);
        expect(result).toEqual({});
    });

    it('should handle an initial LOAD_DATA', () => {
        expect(Object.keys(initialExpectedState).sort()).toEqual([
            'articles',
            'comments',
            'people',
        ]);
        expect(
            R.path(
                [
                    'articles',
                    'byId',
                    '1',
                    'relationships',
                    'author',
                    'data',
                    'id',
                ],
                initialExpectedState
            )
        ).toEqual('9');
        expect(
            R.path<ResourceObject[]>(
                ['articles', 'byId', '1', 'relationships', 'comments', 'data'],
                initialExpectedState
            )!.map(comment => comment.id)
        ).toEqual(['5', '12']);
    });

    it('should handle an additional LOAD_DATA', () => {
        const result = resourceObjects(initialExpectedState, {
            type: actionTypes.LOAD_DATA,
            payload: commentResponse,
        });

        expect(R.path(['comments', 'byId', '44'], result)).toBeTruthy();
        expect(
            R.path(['comments', 'byId', '44', 'attributes', 'body'], result)
        ).toEqual('This is a terrible comment');

        expect(
            R.path(
                [
                    'comments',
                    'byId',
                    '44',
                    'relationships',
                    'author',
                    'data',
                    'id',
                ],
                result
            )
        ).toEqual('9');
    });

    it('should handle ADD_RELATIONSHIP_TO_ENTITY', () => {
        const result = resourceObjects(initialExpectedState, {
            type: actionTypes.ADD_RELATIONSHIP,
            payload: {
                resourceType: 'articles',
                resourceId: '1',
                relationshipKey: 'comments',
                relationshipObject: commentResponse,
            },
        });

        expect(R.path(['comments', 'byId', '44'], result)).toBeTruthy();
        expect(
            R.path<ResourceObject[]>(
                ['articles', 'byId', '1', 'relationships', 'comments', 'data'],
                result
            )!.map(comment => comment.id)
        ).toEqual(['5', '12', '44']);
    });

    it('should handle REMOVE_RELATIONSHIP_FROM_ENTITY', () => {
        const result = resourceObjects(initialExpectedState, {
            type: actionTypes.REMOVE_RELATIONSHIP,
            payload: {
                resourceType: 'articles',
                resourceId: '1',
                relationshipKey: 'comments',
                relationshipId: '5',
            },
        });
        expect(
            R.path<ResourceObject[]>(
                ['articles', 'byId', '1', 'relationships', 'comments', 'data'],
                result
            )!.map(comment => comment.id)
        ).toEqual(['12']);
    });

    it('should handle a SET_RELATIONSHIP_ON_ENTITY', () => {
        const result = resourceObjects(initialExpectedState, {
            type: actionTypes.SET_RELATIONSHIP,
            payload: {
                resourceType: 'articles',
                resourceId: '1',
                relationshipKey: 'editor',
                relationshipObject: {
                    type: 'people',
                    id: '999',
                    attributes: {
                        firstName: 'Triet',
                        lastName: 'Hill',
                        twitter: 't_swizzle',
                    },
                },
            },
        });

        expect(
            R.path(
                [
                    'articles',
                    'byId',
                    '1',
                    'relationships',
                    'editor',
                    'data',
                    'id',
                ],
                result
            )
        ).toEqual('999');
        expect(
            R.path(['people', 'byId', '999', 'attributes', 'firstName'], result)
        ).toEqual('Triet');
    });

    it('should handle a CLEAR_RELATIONSHIP_ON_ENTITY', () => {
        const result = resourceObjects(initialExpectedState, {
            type: actionTypes.CLEAR_RELATIONSHIP,
            payload: {
                resourceType: 'articles',
                resourceId: '1',
                relationshipKey: 'comments',
            },
        });

        expect(
            R.path(
                ['articles', 'byId', '1', 'relationships', 'comments'],
                result
            )
        ).toBeUndefined();
    });

    it('should handle UPDATE_ENTITY', () => {
        const result = resourceObjects(initialExpectedState, {
            type: actionTypes.UPDATE_RESOURCE_OBJECT,
            payload: {
                resourceType: 'articles',
                resourceId: '1',
                data: {
                    title: 'JSON API does not paint my bikeshed!',
                },
            },
        });

        expect(
            R.path(['articles', 'byId', '1', 'attributes', 'title'], result)
        ).toEqual('JSON API does not paint my bikeshed!');
    });

    it('should handle UPDATE_ENTITIES_META and replace a single metadata property', () => {
        const result = resourceObjects(initialExpectedState, {
            type: actionTypes.UPDATE_RESOURCE_OBJECTS_META,
            payload: {
                resourceType: 'articles',
                metaKey: 'randomMetaKey',
                value: true,
            },
        });

        expect(R.path(['articles', 'meta', 'randomMetaKey'], result)).toEqual(
            true
        );
    });

    it('should handle UPDATE_RESOURCE_OBJECTS_META and completely replace the meta object', () => {
        const result = resourceObjects(initialExpectedState, {
            type: actionTypes.UPDATE_RESOURCE_OBJECTS_META,
            payload: {
                resourceType: 'articles',
                metaKey: null,
                value: { newMetaProperty: 'newMetaValue' },
            },
        });

        expect(R.path(['articles', 'meta'], result)).toEqual({
            newMetaProperty: 'newMetaValue',
        });
    });

    it('should handle UPDATE_RESOURCE_OBJECT_META and replace a single metadata property', () => {
        const result = resourceObjects(initialExpectedState, {
            type: actionTypes.UPDATE_RESOURCE_OBJECT_META,
            payload: {
                resourceType: 'articles',
                resourceId: '1',
                metaKey: 'isLoading',
                value: true,
            },
        });

        expect(
            R.path(['articles', 'byId', '1', 'meta', 'isLoading'], result)
        ).toEqual(true);
    });

    it('should handle UPDATE_RESOURCE_OBJECT_META and completely replace the meta object', () => {
        const result = resourceObjects(initialExpectedState, {
            type: actionTypes.UPDATE_RESOURCE_OBJECT_META,
            payload: {
                resourceType: 'articles',
                resourceId: '1',
                metaKey: null,
                value: { randomMetaKey: true },
            },
        });

        expect(R.path(['articles', 'byId', '1', 'meta'], result)).toEqual({
            randomMetaKey: true,
        });
    });

    it('should handle REMOVE_ENTITY', () => {
        const result = resourceObjects(initialExpectedState, {
            type: actionTypes.REMOVE_RESOURCE_OBJECT,
            payload: {
                resourceType: 'articles',
                resourceId: '1',
            },
        });
        expect(result.articles.byId).toEqual({});
    });

    it('should handle CLEAR_ENTITY_TYPE', () => {
        const result = resourceObjects(initialExpectedState, {
            type: actionTypes.CLEAR_RESOURCE_OBJECT_TYPE,
            payload: {
                resourceType: 'articles',
            },
        });

        expect(result.articles).toEqual(undefined);
    });
});
