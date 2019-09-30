import { clone, lensPath, set } from 'ramda';

import { ApiResourceObject } from './ApiResourceObject';

import { itemResponse } from '../../__mocks__/itemResponse';

describe('ApiResourceObject', () => {
    const rO = new ApiResourceObject(clone(itemResponse.data));

    it('builds a new ApiResourceObject', () => {
        expect(rO.attribute('title')).toEqual('JSON API paints my bikeshed!');
        expect(Object.keys(rO.relationships())).toEqual(['author', 'comments']);

        expect(rO.relationship('author').id()).toEqual('9');
        expect(rO.relationship('author').type()).toEqual('people');

        expect(rO.relationship('comments')[0].id()).toEqual('5');
        expect(rO.relationship('comments')[0].type()).toEqual('comments');

        expect(rO.relationship('comments')[1].id()).toEqual('12');
        expect(rO.relationship('comments')[1].type()).toEqual('comments');
    });

    it("updated an ApiResourceObject's attributes immutably", () => {
        const result = rO.update({
            title: 'New title',
            deleted: true
        });

        expect(rO.attributes()).toEqual({
            title: 'JSON API paints my bikeshed!'
        });

        expect(result.attributes()).toEqual({
            title: 'New title',
            deleted: true
        });
    });

    it('adds a relationship immutably', () => {
        const result = rO.addRelationship('comments', 'comments', '4444');

        expect(
            // @ts-ignore
            rO.relationship('comments').map(comment => comment.id())
        ).toEqual(['5', '12']);

        expect(
            // @ts-ignore
            result.relationship('comments').map(comment => comment.id())
        ).toEqual(['5', '12', '4444']);
    });

    it('ads a another ApiResourceObject as a relationship', () => {
        const relationshipApiResourceObject = ApiResourceObject.build(
            'comments',
            { body: 'Inappropriate relationship' },
            '4242'
        );
        const result = rO.addRelationship(
            'comments',
            relationshipApiResourceObject
        );

        expect(
            // @ts-ignore
            rO.relationship('comments').map(comment => comment.id())
        ).toEqual(['5', '12']);

        expect(
            // @ts-ignore
            result.relationship('comments').map(comment => comment.id())
        ).toEqual(['5', '12', '4242']);
    });

    it('removes a relationship immutably', () => {
        const result = rO.removeRelationship('comments', '5');

        expect(
            // @ts-ignore
            rO.relationship('comments').map(comment => comment.id())
        ).toEqual(['5', '12']);

        expect(
            // @ts-ignore
            result.relationship('comments').map(comment => comment.id())
        ).toEqual(['12']);
    });

    it('sets a relationship immutably', () => {
        const result = rO.setRelationship('editor', 'people', '8675309');

        expect(result.relationship('editor').id()).toEqual('8675309');
        expect(result.relationship('editor').type()).toEqual('people');

        expect(rO.relationship('editor')).toBeUndefined;
    });

    it('sets a relationship to another ApiResourceObject immutably', () => {
        const relationshipApiResourceObject = ApiResourceObject.build(
            'people',
            {},
            '4242'
        );

        const result = rO.setRelationship(
            'editor',
            relationshipApiResourceObject
        );

        expect(result.relationship('editor').id()).toEqual('4242');
        expect(result.relationship('editor').type()).toEqual('people');

        expect(rO.relationship('editor')).toBeUndefined;
    });

    it('can build a new ApiResourceObject', () => {
        const result = ApiResourceObject.build('emcee', {
            name: 'SoulSauce',
            status: 'GOAT'
        });

        expect(result.type()).toEqual('emcee');
        expect(result.id()).toBeUndefined();
        expect(result.attributes()).toEqual({
            name: 'SoulSauce',
            status: 'GOAT'
        });
    });

    it('returns the ApiResourceObject without the relationships', () => {
        const result = rO.withoutRelationships();

        expect(result.id()).toBeDefined;
        expect(result.type()).toBeDefined;
        expect(result.attributes()).toBeDefined;
        expect(result.relationships()).toBeUndefined;
    });

    it('can return a serializable object', () => {
        expect(Object.keys(rO.toJSON()).sort()).toEqual([
            'attributes',
            'id',
            'links',
            'relationships',
            'type'
        ]);

        expect(Object.keys(rO.withoutRelationships().toJSON()).sort()).toEqual([
            'attributes',
            'id',
            'links',
            'type'
        ]);
    });

    it('can be mapped over', () => {
        const changeTitleToBeesKnees = set(
            lensPath(['attributes', 'title']),
            'BeesKnees'
        );

        const result = rO.map(changeTitleToBeesKnees);
        expect(result.attribute('title')).toEqual('BeesKnees');
    });
});
