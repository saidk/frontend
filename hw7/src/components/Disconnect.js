import React from 'react';
import PropTypes from 'prop-types';

const Disconnect = ({disconnect}) => {
  return (
    <div className="disconnect">
      <button onClick={disconnect}>Disconnect</button>
    </div>
  );
};

Disconnect.propTypes = {
  disconnect: PropTypes.func.isRequired
};

export default Disconnect;
