// External dependencies
import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';

// Testing dependencies
import { defaultStore, sleepTest } from '__tests__/tools';
import WithAutoRequestComponent from './__mocks__/WithAutoRequestComponent';

describe('withAutoRequest()', () => {
    it('requests and injects a query', async () => {
        const { getByText } = render(
            <Provider store={defaultStore}>
                <WithAutoRequestComponent />
            </Provider>
        );

        // Wait a short period of time to allow fake network response to return.
        await sleepTest(25);

        const title = getByText('JSON API paints my bikeshed!');
        expect(title).toBeTruthy();
    });
});
