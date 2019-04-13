import React from 'react';
import Game from './Game';
import PropTypes from 'prop-types';

const GameList = (props) => {
  const total = (total)=>{
    props.totalMiss(total);
  };
  const GameElements = props.games.map((game) => {
    return (
      <Game frequency={game.frequency} key={game.id} totalMiss={total}>
      </Game>
    );
  });
  return (
    <div className="game-list">
      {GameElements}
    </div>
  );
};

Game.propTypes = {
  frequency: PropTypes.node.isRequired,
};

export default GameList;
