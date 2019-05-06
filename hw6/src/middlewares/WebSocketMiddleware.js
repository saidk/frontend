import {
  LOGIN,
  DISCONNECT
} from '../actions/Actions';

import {connect as connectToWebSocket} from '../WebSocket';

const messageToAction = {
  'online-players': (players) => ({type: 'ONLINE_PLAYERS', payload: players}),
  'connection:accepted': (currentPlayer) => ({type: 'CURRENT_PLAYER_ID', payload: currentPlayer.playerId})
};

const WebSocketMiddleware = (store) => {
  return (next) => {
    let connection = null;
    return (action) => {
      if (action.type === LOGIN) {
        store.dispatch({type: 'CONNECTING'});
        connection = connectToWebSocket({
          parameters: {playerName: action.payload},
          onOpen: () => {
            store.dispatch({type: 'CONNECTED'});
          },
          onClose: ({reason}) => {
            store.dispatch({type: 'DISCONNECTED', payload: {reason}});
          },
          onMessage: ({eventName, payload}) => {
            store.dispatch(messageToAction[eventName](payload));
          }
        });
      } else if (action.type === DISCONNECT) {
        connection.close();
      }
      return next(action);
    };
  };
};

export default WebSocketMiddleware;
