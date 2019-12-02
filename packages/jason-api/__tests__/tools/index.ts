// 3rd Party dependencies
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { act } from 'react-dom/test-utils';
import { applyMiddleware, createStore, combineReducers } from 'redux';

// // Internal dependencies
import { middlewareFactory } from '../../src/redux/middleware';
import { reducer as jasonApi } from '../../src/redux/reducer';

// Testing dependencies
import { defaultState } from '../../__mocks__';

// Mock default actions
const startLoading = () => ({ type: 'START_LOADING' });
const stopLoading = () => ({ type: 'STOP_LOADING' });
const displayError = () => ({ type: 'DISPLAY_ERROR' });

// Middleware Config
const jasonApiMiddleware = middlewareFactory({
    startLoadingActionCreator: startLoading,
    stopLoadingActionCreator: stopLoading,
    displayErrorActionCreator: displayError,
});

// Setup the store
const rootReducer = combineReducers({ jasonApi });

export const defaultStore = createStore(
    rootReducer,
    { jasonApi: defaultState },
    applyMiddleware(jasonApiMiddleware)
);

// Create mock Axios adapter.
export const mockAxios = new MockAdapter(axios);

/**
 * Pause a test for the given ammount of milliseconds.
 */
export const sleepTest = async (timeout: number) => {
    await act(async () => {
        await sleep(timeout);
    });
};

/**
 * Create a Promise that resolves after the given number of milliseconds.
 */
const sleep = (timeout: number) =>
    new Promise(resolve => setTimeout(resolve, timeout));
