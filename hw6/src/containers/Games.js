import {connect} from 'react-redux';
import {CLOSE_GAME, recordHit} from '../actions/Actions';
import {openGames} from '../reducers/Reducer';
import Games from '../components/Games';

const mapStateToProps = (state) => ({
  games: openGames(state.reducer.games),
});

const mapDispatchToProps = (dispatch) => ({
  closeGame: ({gameId}) => dispatch({type: CLOSE_GAME, payload: gameId}),
  recordHit: ({gameId}) => dispatch(recordHit(gameId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Games);
