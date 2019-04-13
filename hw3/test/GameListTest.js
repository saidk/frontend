import React from 'react';
import {shallow} from 'enzyme';

import GameList from '../src/metronome/GameList';
import Game from '../src/metronome/Game';

describe('GameList', () => {
  // Any collection-like component should have a test for the empty case
  it('renders no Gamelist components without game', () => {
    expect(shallow(<GameList games={[]} />)).to.not.contain.descendants(Game);
  });
  it('renders Game component for each game', () => {
    const games = [
      {id: 1, frequency: 111},
      {id: 2, frequency: 222}
    ];
    const gameList = shallow(<GameList games={games} />);
    expect(gameList).to.have.exactly(2).descendants(Game);
  });
});
