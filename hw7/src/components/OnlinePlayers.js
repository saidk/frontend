import React from 'react';
import PropTypes from 'prop-types';

export const Player = ({name}) => <div className="player">{name}</div>;

Player.propTypes = {
  name: PropTypes.string.isRequired
};

const OnlinePlayers = ({players}) => {
  const playerComponents = players.map((player) => <Player key={player.id} name={player.name} />);
  return (
    <div className="onlinePlayers">
      <h1>Online Players</h1>
      {playerComponents}
    </div>
  );
};

OnlinePlayers.propTypes = {
  players: PropTypes.array.isRequired
};

export default OnlinePlayers;
