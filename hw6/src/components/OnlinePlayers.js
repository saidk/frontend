import React from 'react';
import PropTypes from 'prop-types';



const OnlinePlayers = ({players, currentPlayerId}) => {
  let key = 0;
  const onlinePlayers = players.map((player) => {
    key++;
    return (
        <div className='names' key={key}>
          {player.name}
        </div>
    );
  });

  return (
    <div className='onlinePlayers'>
      <h1>
        Online Players
      </h1>
      {onlinePlayers}
    </div>
  );
};

OnlinePlayers.propTypes = {
  players: PropTypes.array.isRequired,
  currentPlayerId: PropTypes.string
};

export default OnlinePlayers;
