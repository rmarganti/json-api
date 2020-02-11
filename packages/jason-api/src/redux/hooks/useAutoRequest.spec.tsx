// External dependencies
import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';

// Testing dependencies
import { defaultStore, sleepTest } from '__tests__/tools';
import AutoRequestComponent from './__mocks__/AutoRequestComponent';
import NonJsonApiAutoRequestComponent from './__mocks__/NonJsonApiAutoRequestComponent';

describe('useAutoRequest()', () => {
    it('It requests and injects a query', async () => {
        const { getByText } = render(
            <Provider store={defaultStore}>
                <AutoRequestComponent />
            </Provider>
        );

        // Wait a short period of time to allow fake network response to return.
        await sleepTest(25);

        const title = getByText('JSON API paints my bikeshed!');
        expect(title).toBeTruthy();
    });

    it('works with non-JSON API responses', async () => {
        const { getByText } = render(
            <Provider store={defaultStore}>
                <NonJsonApiAutoRequestComponent />
            </Provider>
        );

        // Wait a short period of time to allow fake network response to return.
        await sleepTest(25);

        const title = getByText('JSON API paints my bikeshed!');
        expect(title).toBeTruthy();
    });
});
