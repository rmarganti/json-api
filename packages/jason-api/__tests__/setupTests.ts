/**
 * This is just a little hack to silence a warning that we'll get until react
 * Fixes this: https://github.com/facebook/react/pull/14853
 */

/* eslint-disable no-console */
const originalError = console.error;
beforeAll(() => {
    console.error = (...args: any[]) => {
        if (/Warning.*not wrapped in act/.test(args[0])) {
            return;
        }

        originalError.call(console, ...args);
    };
});

afterAll(() => {
    console.error = originalError;
});
/* eslint-enable no-console */
