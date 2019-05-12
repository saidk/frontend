import {
  NEW_GAME_REQUESTED,
  NEW_GAME_SUCCEEDED,
  NEW_GAME_FAILED,
  CLOSE_GAME,
  RECORD_HIT_REQUESTED,
  RECORD_HIT_SUCCEEDED,
  RECORD_HIT_FAILED,
} from '../actions/Actions';
import {adjustBy} from '../PureFunctions';

const initialState = [];

const adjustGame = (games, gameId, fn) => {
  return adjustBy((game) => game.id === gameId, fn, games);
};

const hitNotInFlight = (hit) => hit.status !== 'inFlight';

export const totalMiss = (games) =>
  games.reduce(
    (acc, game) => acc + game.hits
      .filter(hitNotInFlight)
      .reduce((hitAcc, hit) => hitAcc + hit.miss, 0),
    0
  );

export const averageMissPercentage = (games) => average(games.map(averageGameMissPercentage));

const averageGameMissPercentage = (game) => average(missPercentages(game));

const sum = (elems) => elems.reduce((acc, e) => acc + e, 0);

const average = (elems) => {
  if (elems.length === 0) {
    return 0;
  } else {
    return sum(elems) / elems.length;
  }
};

const missPercentages = (game) => game.hits
  .filter(hitNotInFlight)
  .map((hit) => (hit.miss / game.frequency) * 100);

export const openGames = (games) => games.filter(
  (game) => game.status == 'open' || game.status == 'inFlight' || game.status == 'closed'
);

export const isInFlight = (game) => game.status == 'inFlight';

const addInflightHit = (game, localId) => {
  return {...game,
    hits: game.hits.concat({status: 'inFlight'})
  };
};

export default (currentGames = initialState, action) => {
  switch (action.type) {
  case NEW_GAME_REQUESTED: {
    const {localId, frequency} = action.payload;
    const newGame = {
      localId: localId,
      hits: [],
      status: 'inFlight',
      frequency: frequency
    };
    return currentGames.concat(newGame);
  }
  case NEW_GAME_SUCCEEDED: {
    const {localId, id} = action.payload;

    return adjustBy(
      (game) => game.localId === localId,
      (game) => ({...game,
        id: id,
        status: 'open',
        localId: undefined
      }),
      currentGames
    );
  }
  case NEW_GAME_FAILED: {
    const {localId} = action.payload;

    return currentGames.filter((game) => game.localId !== localId);
  }
  case CLOSE_GAME: {
    const gameId = action.payload;

    return adjustGame(currentGames, gameId, (game) => ({...game, status: 'closed'}));
  }
  case RECORD_HIT_REQUESTED: {
    const {gameId} = action.payload;
    return adjustGame(currentGames, gameId, (game) => addInflightHit(game));
  }
  case RECORD_HIT_SUCCEEDED: {
    const {gameId, hits} = action.payload;
    return adjustGame(
      currentGames,
      gameId,
      (game) => ({...game, hits: hits})
    );
  }
  case RECORD_HIT_FAILED: {
    const {gameId} = action.payload;
    return adjustGame(
      currentGames,
      gameId,
      (game) => ({...game,
        hits: game.hits.filter(hitNotInFlight)
      })
    );
  }
  default:
    return currentGames;
  }
};
