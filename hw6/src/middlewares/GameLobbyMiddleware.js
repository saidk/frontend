import {
  NEW_GAME_REQUESTED,
  NEW_GAME_SUCCEEDED,
  NEW_GAME_FAILED,
  RECORD_HIT_REQUESTED,
  RECORD_HIT_FAILED,
  RECORD_HIT_SUCCEEDED
} from '../actions/Actions';

const SERVER_ADDRESS = 'http://localhost:8081';

const createGame = (localId, frequency, dispatch, fetch = window.fetch) => {
  return fetch(
    SERVER_ADDRESS + '/games',
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({type: 'metronome', frequency: frequency})
    },
  ).then((response) => {
    if (response.ok) {
      response.json().then(
        ({id}) => dispatch({type: NEW_GAME_SUCCEEDED, payload: {id, localId}}),
        () => dispatch({type: NEW_GAME_FAILED, payload: {localId, error: 'Unparseable response'}})
      );
    } else {
      response.json().then(
        ({error}) => dispatch({type: NEW_GAME_FAILED, payload: {localId, error}}),
        () => dispatch({type: NEW_GAME_FAILED, payload: {localId, error: 'Unparseable response'}})
      );
    }
  }).catch((error) => {
    dispatch({type: NEW_GAME_FAILED, payload: {localId, error: 'Service unreachable'}});
  });
};

const recordHit = (gameId, dispatch, fetch = window.fetch) => {
  return fetch(
    SERVER_ADDRESS + `/games/${gameId}/moves`,
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      }
    },
  ).then((response) => {
    if (response.ok) {
      response.json().then(
        ({tries}) => dispatch({type: RECORD_HIT_SUCCEEDED, payload: {gameId, hits: tries}}),
        () => dispatch({type: RECORD_HIT_FAILED, payload: {gameId, error: 'Unparseable response'}})
      );
    } else {
      response.json().then(
        ({error}) => dispatch({type: RECORD_HIT_FAILED, payload: {gameId, error}}),
        () => dispatch({type: RECORD_HIT_FAILED, payload: {gameId, error: 'Unparseable response'}})
      );
    }
  }).catch((error) => {
    dispatch({type: RECORD_HIT_FAILED, payload: {gameId, error: 'Service unreachable'}});
  });
};

export default (store) => (next) => (action) => {
  if (action.type === NEW_GAME_REQUESTED) {
    const {localId, frequency} = action.payload;
    createGame(localId, frequency, store.dispatch);
  } else if (action.type === RECORD_HIT_REQUESTED) {
    const {gameId} = action.payload;
    recordHit(gameId, store.dispatch);
  }
  return next(action);
};
