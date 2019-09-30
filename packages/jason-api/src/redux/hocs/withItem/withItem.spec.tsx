// External dependencies
import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';

// Testing dependencies
import { defaultStore } from '__tests__/tools';
import WithItemComponent from './__mocks__/WithItemComponent';

describe('withItem()', () => {
    it('requests and injects a query', () => {
        const { getByText } = render(
            <Provider store={defaultStore}>
                <WithItemComponent />
            </Provider>
        );

        const title = getByText('JSON API paints my bikeshed!');
        expect(title).toBeTruthy();
    });
});
