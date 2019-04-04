import React from 'react';
import PropTypes from 'prop-types';
import Try from './Try';

const TriesList = (props) => {
  const tryElements = props.tries.map((tryy) => {
    return (
      <Try key={tryy.id} milliSeconds={tryy.milliSeconds} id={tryy.id} color={tryy.color}>
      </Try>
    );
  });
  return (
    <div className="comment-list">
      {tryElements.reverse()}
    </div>
  );
};

TriesList.propTypes = {
  tries: PropTypes.arrayOf(PropTypes.shape({
    milliSeconds: PropTypes.number,
    id: PropTypes.number,
  })).isRequired
};

export default TriesList;
