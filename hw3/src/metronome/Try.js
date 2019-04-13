import React from 'react';
import PropTypes from 'prop-types';

const Try = (props) => {
  return (
    <div className="comment">
      <p className={props.color}>Try {props.id}: Missed by {props.milliSeconds} Milliseconds</p>
    </div>
  );
};

Try.propTypes = {
  milliSeconds: PropTypes.node.isRequired,
  id: PropTypes.node.isRequired,
};

export default Try;
