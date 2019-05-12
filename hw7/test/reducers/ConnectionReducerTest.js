import {
  CONNECT_REQUESTED,
  PLAYERS_RECEIVED,
  DISCONNECTED
} from '../../src/actions/Actions';

import reducer from '../../src/reducers/ConnectionReducer';

describe('ConnectionReducer', () => {
  it('is initially disconnected', () => {
    expect(reducer(undefined, {type: 'UNKNOWN'}))
      .to.include({status: 'disconnected'});
  });

  it('changes connection status to connectin upon CONNECT_REQUESTED', () => {
    const initialStatus = {
      status: 'disconnected',
      disconnectReason: 'reason'
    };
    expect(reducer(initialStatus, {type: CONNECT_REQUESTED, payload: 'name'}))
      .to.include({
        status: 'connecting',
        playerName: 'name',
        disconnectReason: undefined
      });
  });

  it('changes connection status to disconnected on DISCONNECTED', () => {
    const initialState = {
      status: 'connected',
      playerName: 'playerName'
    };

    expect(reducer(initialState, {type: DISCONNECTED, payload: {reason: 'reason'}}))
      .to.include({
        status: 'disconnected',
        disconnectReason: 'reason'
      });
  });

  it('changes status to connected on PLAYERS_RECEIVED', () => {
    const initialState = {
      status: 'connecting',
      playerName: 'playerName'
    };

    expect(reducer(initialState, {type: PLAYERS_RECEIVED, payload: []}))
      .to.include({
        status: 'connected'
      });
  });
});
