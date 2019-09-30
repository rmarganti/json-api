import {
    attribute,
    attributeOr,
    attributes,
    setAttribute,
    updateAttributes
} from './attributes';

import { itemResponse } from '../../../__mocks__/itemResponse';

const article = itemResponse.data;

describe('Relationship Object attribute functions', () => {
    it('gets all attributes of a resource object', () => {
        const result = attributes(article);

        expect(result).toEqual({
            title: 'JSON API paints my bikeshed!'
        });
    });

    it('gets a single attribute of a resource object', () => {
        const result = attribute('title', article);

        expect(result).toEqual('JSON API paints my bikeshed!');
    });

    it('gets a single attribute of a resource object with a default fallback', () => {
        const result = attributeOr('banana', 'flavor', article);

        expect(result).toEqual('banana');
    });

    it('sets an attribute', () => {
        const result = setAttribute('title', 'New Title', article);

        expect(result.attributes!.title).toEqual('New Title');
    });

    it('updates multiple attributes', () => {
        const result = updateAttributes(
            {
                flavor: 'Piña colada',
                subtitle: 'How I Spent My Summer Vacation'
            },
            article
        );

        expect(result.attributes).toEqual({
            flavor: 'Piña colada',
            subtitle: 'How I Spent My Summer Vacation',
            title: 'JSON API paints my bikeshed!' // This is untouched
        });
    });
});
