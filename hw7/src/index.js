import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import createRootReducer from './reducers/Reducer';
import App from './containers/App';
import gameLobbyMiddleware from './middlewares/GameLobbyMiddleware';
import loggingMiddleware from './middlewares/LoggingMiddleware';
import {createBrowserHistory} from 'history';
import {routerMiddleware} from 'connected-react-router';
import thunk from 'redux-thunk';

export const start = () => {
    // `__REDUX_DEVTOOLS_EXTENSION_COMPOSE__` will make sure that redux devtools
    // store enhancher is applied last so that it will not miss any actions. See
    // https://redux.js.org/api-reference/applymiddleware#tips for more information.
    const composeStoreEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    // Create a abstraction over DOM history API which will be passed both to React
    // Router and Redux.
    const history = createBrowserHistory();

    const store = createStore(
        createRootReducer(history), // Pass history to create "router" state slice
        composeStoreEnhancers(
            applyMiddleware(
                routerMiddleware(history), // Integrate history actions with history API
                thunk,
                gameLobbyMiddleware,
                loggingMiddleware
            )
        )
    );

    ReactDOM.render(
        <Provider store={store}>
            <App history={history}/>
        </Provider>,
        document.getElementById('root')
    );
};
start();
