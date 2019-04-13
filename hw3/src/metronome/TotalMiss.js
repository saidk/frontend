import React from 'react';
import PropTypes from 'prop-types';

const TotalMiss = (props) => {
  return (
    <div className="TotalMiss">
            Your total miss thus far is {props.totalMiss}
    </div>
  );
};

TotalMiss.propTypes = {
  totalMiss: PropTypes.node,
};

export default TotalMiss;
