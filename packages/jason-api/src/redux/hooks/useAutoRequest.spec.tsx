// External dependencies
import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';

// Testing dependencies
import { defaultStore } from '__tests__/tools';
import AutoRequestComponent from './__mocks__/AutoRequestComponent';
import { act } from 'react-dom/test-utils';

describe('useAutoRequest()', () => {
    it('It requests and injects a query', done => {
        const { getByText } = render(
            <Provider store={defaultStore}>
                <AutoRequestComponent />
            </Provider>
        );

        // Wait a short period of time to allow fake network response to return.
        act(() => {
            setTimeout(() => {
                const title = getByText('JSON API paints my bikeshed!');
                expect(title).toBeTruthy();
                done();
            }, 10);
        });
    });
});
