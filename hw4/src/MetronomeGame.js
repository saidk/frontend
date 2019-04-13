import React from 'react';
import PropTypes from 'prop-types';
import MetronomeHitHistory from './MetronomeHitHistory';
import MetronomeButton from './MetronomeButton';

const MetronomeGame = ({frequencyMs, hits, onHit, onClose}) => {
  return (
    <div className="metronomeGame">
      <div>Click the button exactly every {frequencyMs} milliseconds</div>
      <button className="metronomeButton close" onClick={onClose}>Close game</button>
      <MetronomeButton onHit={onHit} />
      <MetronomeHitHistory hits={hits} frequency={frequencyMs} />
    </div>
  );
};

MetronomeGame.propTypes = {
  frequencyMs: PropTypes.number.isRequired,
  hits: PropTypes.array.isRequired,
  onHit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};

export default MetronomeGame;
