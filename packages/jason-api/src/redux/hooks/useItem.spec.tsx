// External dependencies
import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';

// Testing dependencies
import { defaultStore } from '__tests__/tools';
import ItemComponent from './__mocks__/ItemComponent';

describe('useItem()', () => {
    it('retrieves a ResourceItem from the store', () => {
        const { container } = render(
            <Provider store={defaultStore}>
                <ItemComponent id="5" />
            </Provider>
        );

        const body = container.querySelector('p');

        expect(body).toBeTruthy();
    });
});
