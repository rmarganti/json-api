// External dependencies
import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';

// Testing dependencies
import { defaultStore } from '__tests__/tools';
import WithCollectionComponent from './__mocks__/WithCollectionComponent';

describe('withQuery()', () => {
    it('requests and injects a query', () => {
        const { container, getByText } = render(
            <Provider store={defaultStore}>
                <WithCollectionComponent />
            </Provider>
        );

        const comments = container.querySelectorAll('p');
        expect(comments).toHaveLength(2);

        const comment1 = getByText('First!');
        expect(comment1).toBeDefined();

        const comment2 = getByText('I like XML better');
        expect(comment2).toBeDefined();
    });
});
