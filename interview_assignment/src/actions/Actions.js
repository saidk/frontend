export const NEW_GAME = 'NEW_GAME';
export const CLOSE_GAME = 'CLOSE_GAME';
export const LOGIN = 'LOGIN';
export const RECORD_HIT = 'RECORD_HIT';

export const newGame = (frequency) => ({
  type: NEW_GAME,
  payload: {frequency, startMilliseconds: Date.now()}
});

export const recordHit = (gameId) => ({
  type: RECORD_HIT,
  payload: {gameId, nowMillis: Date.now()}
});
