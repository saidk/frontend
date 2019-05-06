import React from 'react';
import MetronomeGame from './MetronomeGame';
import PropTypes from 'prop-types';
import {isInFlight} from '../reducers/Reducer';

export const GameInFlight = () => <div>Game is being created...</div>;

const Games = (props) => {
  const games = props.games
    .map((game, index) => {
      if (isInFlight(game)) {
        return <GameInFlight key={index} />;
      } else {
        return (
          <MetronomeGame
            key={index}
            frequencyMs={game.frequency}
            hits={game.hits}
            onHit={() => props.recordHit({gameId: game.id})}
            onClose={() => props.closeGame({gameId: game.id})}
          />
        );
      }
    });

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

export default Games;
