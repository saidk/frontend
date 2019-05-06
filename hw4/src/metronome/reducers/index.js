import {
    LOGIN,
    ADD_GAME,
    CLOSE_GAME,
    RECORD_HIT
} from '../actions/index.js';
import {adjustBy} from '../components/PureFunctions';

const initialLog = false;
const initialName = '';
const initialGames = [];

const initialState = {
    isSubmitted: initialLog,
    name: initialName,
    games: initialGames,
};

const gameReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN: {
            return {...state, name: action.name, isSubmitted: action.loggedIn};
        }
        case ADD_GAME: {
            const newGames = state.games.concat({
                id: action.payload.id,
                hits: action.payload.hits,
                open: action.payload.open,
                frequency: action.payload.frequency,
                startMilliseconds: action.payload.startMilliseconds
            });
            return {...state, games: newGames};
        }
        case CLOSE_GAME: {
            state.games[action.payload.gameId.gameId].open = 0;
            return {...state, games: state.games.filter((game) =>
                game.open === 1
            )
            };
        }
        case RECORD_HIT: {
            const millisNow = Date.now();
            const newGames = adjustBy(
                (game) => game.id === action.payload.gameId.gameId,
                (game) => ({...game,
                    hits: game.hits.concat([{
                        miss: calculateMiss(game.startMilliseconds, millisNow, game.frequency)
                    }])
                }),
                state.games,
            );
            return {...state, games: newGames};
        }
        default:
            return state;
    }
};
const calculateMiss = (startMilliseconds, nowMilliseconds, frequency) => {
    const remainder = (nowMilliseconds - startMilliseconds) % frequency;
    if (remainder >= frequency / 2) {
        return frequency - remainder;
    } else {
        return remainder;
    }
};
export default gameReducer;
