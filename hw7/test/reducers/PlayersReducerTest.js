import {
  PLAYERS_RECEIVED,
  DISCONNECTED
} from '../../src/actions/Actions';

import reducer from '../../src/reducers/PlayersReducer';

describe('ConnectionReducer', () => {
  it('has no players defined initially', () => {
    expect(reducer(undefined, {type: 'UNKNOWN'}))
      .to.eql(null);
  });

  it('sets players upon PLAYERS_RECEIVED', () => {
    const players = [{id: 'id', name: 'name'}];
    expect(reducer(undefined, {type: PLAYERS_RECEIVED, payload: {players}}))
      .to.eql(players);
  });

  it('sets players to undefined on DISCONNECTED', () => {
    const initialState = [{id: 'id', name: 'name'}];

    expect(reducer(initialState, {type: DISCONNECTED, payload: {reason: 'reason'}}))
      .to.eql(null);
  });
});
