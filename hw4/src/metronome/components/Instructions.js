import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

const Instructions = ({name, totalMiss, averageMiss}) => {
  return (
    <Fragment>
      <div className="instructions">{`Hi ${name}, let's play Human Metronome!`}</div>
      <div className="instructions">{`Your total miss thus far is ${totalMiss} ms`}</div>
      <div className="instructions">{`Your average miss thus far is ${averageMiss} %`}</div>
    </Fragment>
  );
};

Instructions.propTypes = {
  name: PropTypes.string,
  totalMiss: PropTypes.number.isRequired,
  averageMiss: PropTypes.number.isRequired
};

export default Instructions;
