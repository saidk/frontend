import React from 'react';
import PropTypes from 'prop-types';
import MetronomeHit from './MetronomeHit';
import {reverse} from '../PureFunctions';

export const HitInFlight = () => <div>Hit is being recorded...</div>;

const MetronomeHitHistory = ({hits, frequency}) => {
  const hitList = reverse(hits).map((hit, index) => {
    const reverseIndex = hits.length - 1 - index;
    if (hit.status === 'inFlight') {
      return <HitInFlight key={reverseIndex} />;
    } else {
      return (
        <MetronomeHit
          key={reverseIndex}
          index={reverseIndex}
          missInMilliseconds={hit.miss}
          missInFractions={hit.miss / frequency}
        />
      );
    }
  });

  return (
    <div className="history">
      {hitList}
    </div>
  );
};

MetronomeHitHistory.propTypes = {
  hits: PropTypes.array.isRequired,
  frequency: PropTypes.number.isRequired
};

export default MetronomeHitHistory;
