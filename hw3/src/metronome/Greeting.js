import React from 'react';
import PropTypes from 'prop-types';

const Greeting = (props) => {
  return (
    <div className="Greeting">
      Hi {props.playerName}, let`s play Human metronome
    </div>
  );
};

Greeting.propTypes = {
  playerName: PropTypes.string,
};

export default Greeting;
