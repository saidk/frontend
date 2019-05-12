import {NEW_GAME, CLOSE_GAME, RECORD_HIT, LOGIN} from '../actions/Actions';
import {adjustBy} from '../PureFunctions';

const initialState = {
  loggedIn: false,
  playerName: undefined,
  games: [],
  products: [
    {image: '', text: 'This is first product', id: 1},
    {image: '', text: 'This is second product', id: 2},
    {image: '', text: 'This is third product', id: 3},
  ]
};

const calculateMiss = (startMilliseconds, nowMilliseconds, frequency) => {
  const remainder = (nowMilliseconds - startMilliseconds) % frequency;
  if (remainder >= frequency / 2) {
    return frequency - remainder;
  } else {
    return remainder;
  }
};

export const totalMiss = (games) =>
  games.reduce(
    (acc, game) => acc + game.hits.reduce((hitAcc, hit) => hitAcc + hit.miss, 0),
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

const missPercentages = (game) => game.hits.map((hit) => (hit.miss / game.frequency) * 100);

export const openGames = (games) => games.filter((game) => game.open);

const recordHit = (game, millisNow) =>
  ({...game,
    hits: game.hits.concat([{
      miss: calculateMiss(game.startMilliseconds, millisNow, game.frequency)
    }])
  });

export default (state = initialState, action) => {
  switch (action.type) {
  case LOGIN: {
    const playerName = action.payload;

    return {...state, loggedIn: true, playerName: playerName};
  }
  case NEW_GAME: {
    const {frequency, startMilliseconds} = action.payload;

    const newGame = {
      id: state.games.length,
      hits: [],
      open: true,
      frequency: frequency,
      startMilliseconds: startMilliseconds
    };
    return {...state, games: state.games.concat(newGame)};
  }
  case CLOSE_GAME: {
    const gameId = action.payload;

    const newGames = adjustBy(
      (game) => game.id === gameId,
      (game) => ({...game, open: false}),
      state.games
    );
    return {...state, games: newGames};
  }

  case RECORD_HIT: {
    const {gameId, nowMillis} = action.payload;

    const newGames = adjustBy(
      (game) => game.id === gameId,
      (game) => recordHit(game, nowMillis),
      state.games,
    );

    return {...state, games: newGames};
  }
  default:
    return state;
  }
};
