import React from 'react';
import PropTypes from 'prop-types';

const Greeting = (props) => {
  return (
    <div className="Greeting">
      Hi {props.playerName}, try to click the button exactly every 1000 milliseconds
    </div>
  );
};

Comment.propTypes = {
  playerName: PropTypes.string,
};

export default Greeting;
