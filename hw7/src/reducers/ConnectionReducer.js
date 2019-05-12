import {
  CONNECT_REQUESTED,
  PLAYERS_RECEIVED,
  DISCONNECTED
} from '../actions/Actions';

const initialState = {
  status: 'disconnected',
  disconnectReason: undefined,
  playerName: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
  case CONNECT_REQUESTED: {
    const playerName = action.payload;

    return {...initialState, status: 'connecting', playerName: playerName};
  }
  case DISCONNECTED: {
    const {reason} = action.payload;

    return {...initialState, status: 'disconnected', disconnectReason: reason};
  }
  case PLAYERS_RECEIVED: {
    return {...state, status: 'connected'};
  }
  default:
    return state;
  }
};
