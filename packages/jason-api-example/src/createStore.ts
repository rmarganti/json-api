// External Dependencies
import {
    applyMiddleware,
    combineReducers,
    compose,
    createStore as originalCreateStore,
} from 'redux';

// JasonAPI
import {
    middleware as jasonApiMiddleware,
    reducer as jasonApi,
} from '../../src';

// Setup the store
const rootReducer = combineReducers({ jasonApi });

// Enable redux dev tools
declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: typeof compose;
    }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const createStore = () =>
    originalCreateStore(
        rootReducer,
        composeEnhancers(applyMiddleware(jasonApiMiddleware))
    );
