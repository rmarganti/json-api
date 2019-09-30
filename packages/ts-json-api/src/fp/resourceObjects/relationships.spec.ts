import {
    addRelationship,
    relationship,
    relationshipData,
    relationships,
    removeRelationship,
    setRelationship
} from './relationships';

import { itemResponse } from '../../../__mocks__/itemResponse';

const article = itemResponse.data;

describe('Resource Objects relationship functions', () => {
    it('gets all relationships of a Resource Object', () => {
        const result = relationships(article);

        expect(result).toEqual(article.relationships);
    });

    it('gets a single relationship', () => {
        const result = relationship('author', article);
        expect(result).toEqual(article.relationships.author);
    });

    it("gets a single relationship's data", () => {
        const result = relationshipData('author', article);
        expect(result).toEqual(article.relationships.author.data);
    });

    it('adds a relationship', () => {
        expect(article.relationships.comments.data).toHaveLength(2);

        const result = addRelationship('comments', 'comments', '4444', article);

        const comments = result.relationships!.comments.data;

        expect(comments).toHaveLength(3);

        // @ts-ignore
        expect(comments[2]).toEqual({
            type: 'comments',
            id: '4444'
        });
    });

    it('removes a relationship', () => {
        const result = removeRelationship('comments', '12', article);

        const comments = result.relationships!.comments.data;

        expect(comments).toHaveLength(1);

        // @ts-ignore
        expect(comments[0]).toEqual({
            type: 'comments',
            id: '5'
        });
    });

    it('sets a to-one relationship', () => {
        const result = setRelationship('author', 'people', '9999', article);

        expect(result.relationships!.author.data).toEqual({
            type: 'people',
            id: '9999'
        });
    });
});
