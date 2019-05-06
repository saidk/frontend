import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import App from './containers/App';
import GameLobbyMiddleware from './middlewares/GameLobbyMiddleware';
import loggingMiddleware from './middlewares/LoggingMiddleware';
import WebSocketMiddleware from './middlewares/WebSocketMiddleware';

import {connect as connectWebSocket} from './WebSocket';

export const start = () => {
    const composeStoreEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const store = createStore(
        reducer,
        composeStoreEnhancers(
            applyMiddleware(
                thunk,
                loggingMiddleware,
                GameLobbyMiddleware,
                WebSocketMiddleware
            )
        )
    );

    const messageToAction = {
        'ping': ({pingCount}) => ({type: 'RECEIVED_PING', payload: {pingCount}}),
        'connection:accepted': console.log('connection:accepted'), // eslint-disable-line no-console
        'online-players': console.log('online-players') // eslint-disable-line no-console
    };

    let webSocketConnection = null;
    const initiateConnection = () => {
        // Every asynchronous process initiation is accompanied by a notification
        store.dispatch({type: 'CONNECTING'});

        webSocketConnection = connectWebSocket({
            onOpen: () =>
                store.dispatch({type: 'CONNECTED'}),
            onClose: ({reason}) =>
                store.dispatch({type: 'DISCONNECTED', payload: {reason}}),
            onMessage: ({eventName, payload}) => {
                store.dispatch(messageToAction[eventName](payload));

                if (eventName === 'ping' && payload.pingCount == 3) {
                    webSocketConnection.close();
                    setTimeout(() => initiateConnection(), 1000);
                }
            }
        });
    };

    // Initiate connection immediately
    initiateConnection();

    ReactDOM.render(
        <Provider store={store}>
            <App/>
        </Provider>,
        document.getElementById('root')
    );
};
