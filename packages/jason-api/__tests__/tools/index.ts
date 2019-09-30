// 3rd Party dependencies
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
