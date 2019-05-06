import {
    NEW_GAME_REQUESTED,
    NEW_GAME_SUCCEEDED,
    NEW_GAME_FAILED,
    CLOSE_GAME,
    RECORD_HIT_REQUESTED,
    RECORD_HIT_SUCCEEDED,
    RECORD_HIT_FAILED,
    LOGIN,
    DISCONNECTED,
    ONLINE_PLAYERS,
    CURRENT_PLAYER_ID
} from '../actions/Actions';
import {adjustBy} from '../PureFunctions';

const initialState = {
    loggedIn: false,
    playerName: undefined,
    playerList: [],
    playerId: undefined,
    games: []
};

const adjustGame = (state, gameId, fn) => {
    const newGames = adjustBy(
        (game) => game.id === gameId,
        fn,
        state.games,
    );

    return {...state, games: newGames};
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
    (game) => game.status == 'open' || game.status == 'inFlight'
);

export const isInFlight = (game) => game.status == 'inFlight';

const addInflightHit = (game, localId) => {
    return {
        ...game,
        hits: game.hits.concat({status: 'inFlight'})
    };
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN: {
            const playerName = action.payload;

            return {...state, loggedIn: true, playerName: playerName};
        }
        case NEW_GAME_REQUESTED: {
            const {localId, frequency} = action.payload;
            const newGame = {
                localId: localId,
                hits: [],
                status: 'inFlight',
                frequency: frequency
            };
            return {...state, games: state.games.concat(newGame)};
        }
        case NEW_GAME_SUCCEEDED: {
            const {localId, id} = action.payload;

            const newGames = adjustBy(
                (game) => game.localId === localId,
                (game) => ({
                    ...game,
                    id: id,
                    status: 'open',
                    localId: undefined
                }),
                state.games
            );
            return {...state, games: newGames};
        }
        case NEW_GAME_FAILED: {
            const {localId} = action.payload;

            const newGames = state.games.filter((game) => game.localId !== localId);
            return {...state, games: newGames};
        }
        case CLOSE_GAME: {
            const gameId = action.payload;

            return adjustGame(state, gameId, (game) => ({...game, status: 'closed'}));
        }
        case RECORD_HIT_REQUESTED: {
            const {gameId} = action.payload;
            return adjustGame(state, gameId, (game) => addInflightHit(game));
        }
        case RECORD_HIT_SUCCEEDED: {
            const {gameId, hits} = action.payload;
            return adjustGame(
                state,
                gameId,
                (game) => ({...game, hits: hits})
            );
        }
        case RECORD_HIT_FAILED: {
            const {gameId} = action.payload;
            return adjustGame(
                state,
                gameId,
                (game) => ({
                    ...game,
                    hits: game.hits.filter(hitNotInFlight)
                })
            );
        }
        case DISCONNECTED: {
            return {...state, loggedIn: false, playerName: undefined, games: []};
        }
        case CURRENT_PLAYER_ID: {
            const id = action.payload;
            return {...state, playerId: id};
        }
        case ONLINE_PLAYERS: {
            const updatedPlayers = action.payload;
            return {...state, playerList: updatedPlayers};
        }
        default:
            return state;
    }
};
