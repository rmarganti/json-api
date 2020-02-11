// External dependencies
import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';

// Testing dependencies
import { defaultStore } from '__tests__/tools';
import CollectionComponent from './__mocks__/CollectionComponent';

describe('useCollection()', () => {
    it('retrieves a Resource Collection from the store', () => {
        const { container } = render(
            <Provider store={defaultStore}>
                <CollectionComponent />
            </Provider>
        );

        const comments = container.querySelectorAll('p');
        expect(comments).toHaveLength(2);
    });
});
