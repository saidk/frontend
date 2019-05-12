import {connect} from 'react-redux';
import {CLOSE_GAME, recordHit} from '../actions/Actions';
import {openGames} from '../reducers/GamesReducer';
import Games from '../components/Games';

const mapStateToProps = (state, gameStatus) => ({
  games: openGames(state.games),
  gameStatus: gameStatus
});

const mapDispatchToProps = (dispatch) => ({
  closeGame: ({gameId}) => dispatch({type: CLOSE_GAME, payload: gameId}),
  recordHit: ({gameId}) => dispatch(recordHit(gameId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Games);
