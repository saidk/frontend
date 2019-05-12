import connectionReducer from './ConnectionReducer';
import gamesReducer from './GamesReducer';
import playersReducer from './PlayersReducer';
import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';

export default (history) => combineReducers({
  router: connectRouter(history),
  connection: connectionReducer,
  games: gamesReducer,
  players: playersReducer
});
