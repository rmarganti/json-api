// External Dependencies
import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createGlobalStyle } from 'styled-components';

// Internal Dependencies
import App from './src/App';
import { mockAxios } from './src/mockAxios';
import { createStore } from './src/createStore';

// Mock the network response.
mockAxios();

const RootStyles = createGlobalStyle`
    body {
        padding: 3em;
    }

    h1 {
        margin-bottom: 1em;
        line-height: 1.25em;
        text-transform: capitalize;
    }

    p {
        line-height: 1.625em;
    }
`;

ReactDOM.render(
    <Provider store={createStore()}>
        <RootStyles />
        <App />
    </Provider>,
    document.getElementById('root')
);
