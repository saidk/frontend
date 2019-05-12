import React from 'react';
import MetronomeGame from '../components/MetronomeGame';
import {connect} from 'react-redux';
import {CLOSE_GAME, recordHit} from '../actions/Actions';
import PropTypes from 'prop-types';
import {openGames} from '../reducers/Reducer';

const Games = (props) => {
  const games = props.games
    .map((game, index) =>
      <MetronomeGame
        key={index}
        frequencyMs={game.frequency}
        hits={game.hits}
        onHit={() => props.recordHit({gameId: game.id})}
        onClose={() => props.closeGame({gameId: game.id})}
      />
    );

  return (
    <div className="games">
      {games}
    </div>
  );
};

Games.propTypes = {
  games: PropTypes.array.isRequired,
  closeGame: PropTypes.func.isRequired,
  recordHit: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  games: openGames(state.games),
});

const mapDispatchToProps = (dispatch) => ({
  closeGame: ({gameId}) => dispatch({type: CLOSE_GAME, payload: gameId}),
  recordHit: ({gameId}) => dispatch(recordHit(gameId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Games);
