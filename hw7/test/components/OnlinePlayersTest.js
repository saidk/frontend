import React from 'react';
import {shallow} from 'enzyme';

import OnlinePlayers, {Player} from '../../src/components/OnlinePlayers';

describe('OnlinePlayers', () => {
  it('renders successfully', () => {
    expect(shallow(
      <OnlinePlayers players={[]} />
    )).to.exist;
  });

  it('renders players', () => {
    const onlinePlayers = shallow(
      <OnlinePlayers
        players={[{id: 'id', name: 'name'}]}
        closeGame={sinon.stub()}
        recordHit={sinon.stub()}
      />
    );
    expect(onlinePlayers).to.have.exactly(1).descendants(Player);
  });
});
