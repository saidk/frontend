import React from 'react';
import {shallow} from 'enzyme';

import Games, {GameInFlight} from '../../src/components/Games';
import MetronomeGame from '../../src/components/MetronomeGame';

describe('Games', () => {
  it('renders successfully', () => {
    expect(shallow(
      <Games
        games={[]}
        closeGame={sinon.stub()}
        recordHit={sinon.stub()}
      />
    )).to.exist;
  });

  it('renders in flight games', () => {
    const games = shallow(
      <Games
        games={[{status: 'inFlight'}]}
        closeGame={sinon.stub()}
        recordHit={sinon.stub()}
      />
    );
    expect(games).to.have.exactly(1).descendants(GameInFlight);
  });

  it('renders open games', () => {
    const games = shallow(
      <Games
        games={[{id: 1, status: 'open', hits: [], frequency: 5}]}
        closeGame={sinon.stub()}
        recordHit={sinon.stub()}
      />
    );
    expect(games).to.have.exactly(1).descendants(MetronomeGame);
  });
});
