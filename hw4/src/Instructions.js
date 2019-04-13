import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

const Instructions = ({name, totalMiss}) => {
  return (
    <Fragment>
      <div className="instructions">{`Hi ${name}, let's play Human Metronome!`}</div>
      <div className="instructions">{`Your total miss thus far is ${totalMiss} ms`}</div>
    </Fragment>
  );
};

Instructions.propTypes = {
  name: PropTypes.string,
  totalMiss: PropTypes.number.isRequired
};

export default Instructions;
