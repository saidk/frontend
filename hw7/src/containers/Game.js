import React from 'react';
import MetronomeGame from '../components/MetronomeGame';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {CLOSE_GAME, recordHit} from '../actions/Actions';
const GameOrNotFound = ({game, gameId, closeGame, recordHit}) => {
    if (game.status !== 'closed') {
        return <MetronomeGame
          frequencyMs={game.frequency}
          hits={game.hits}
          onHit={() => recordHit({gameId: gameId})}
          onClose={() => closeGame({gameId: gameId})}
        />;
    } else {
        return <p>Game {gameId} is closed</p>;
    }
};
GameOrNotFound.propTypes = {
    gameId: PropTypes.string.isRequired,
    game: PropTypes.array.isRequired,
    closeGame: PropTypes.func.isRequired,
    recordHit: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    // Use match.params provided by React Router to get comment ID
    const gameId = ownProps.match.params.gameId;
    // Find comment by ID from comments in state
    const game = state.games.find((game) => game.id === gameId);
    return {game, gameId: gameId};
};

const mapDispatchToProps = (dispatch) => ({
    closeGame: ({gameId}) => dispatch({type: CLOSE_GAME, payload: gameId}),
    recordHit: ({gameId}) => dispatch(recordHit(gameId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameOrNotFound);
