import {
  PLAYERS_RECEIVED,
  DISCONNECTED
} from '../actions/Actions.js';

const initialState = null;

export default (currentPlayers = initialState, action) => {
  switch (action.type) {
  case PLAYERS_RECEIVED: {
    const {players} = action.payload;

    return players;
  }
  case DISCONNECTED: {
    return initialState;
  }
  default:
    return currentPlayers;
  }
};
