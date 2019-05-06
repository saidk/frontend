export const NEW_GAME_REQUESTED = 'NEW_GAME_REQUESTED';
export const NEW_GAME_SUCCEEDED = 'NEW_GAME_SUCCEEDED';
export const NEW_GAME_FAILED = 'NEW_GAME_FAILED';
export const CLOSE_GAME = 'CLOSE_GAME';
export const LOGIN = 'LOGIN';
export const DISCONNECT = 'DISCONNECT';
export const ONLINE_PLAYERS = 'ONLINE_PLAYERS';
export const CURRENT_PLAYER_ID = 'CURRENT_PLAYER_ID';
export const DISCONNECTED = 'DISCONNECTED';
export const RECORD_HIT_REQUESTED = 'RECORD_HIT_REQUESTED';
export const RECORD_HIT_SUCCEEDED = 'RECORD_HIT_SUCCEEDED';
export const RECORD_HIT_FAILED = 'RECORD_HIT_FAILED';

let localGameId = 0;
export const newGame = (frequency) => {
  localGameId = localGameId + 1;
  return {
    type: NEW_GAME_REQUESTED,
    payload: {frequency, localId: localGameId}
  };
};

export const recordHit = (gameId) => {
  return {
    type: RECORD_HIT_REQUESTED,
    payload: {gameId}
  };
};
