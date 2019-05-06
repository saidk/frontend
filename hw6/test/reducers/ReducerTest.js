import reducer, {
  totalMiss,
  averageMissPercentage,
  openGames
} from '../../src/reducers/Reducer';

import {
  LOGIN,
  NEW_GAME_REQUESTED,
  NEW_GAME_SUCCEEDED,
  NEW_GAME_FAILED,
  CLOSE_GAME,
  RECORD_HIT_REQUESTED,
  RECORD_HIT_SUCCEEDED,
  RECORD_HIT_FAILED
} from '../../src/actions/Actions';

describe('Reducer', () => {
  describe('totalMiss', () => {
    it('is 0 when no games', () => {
      expect(totalMiss([])).to.eq(0);
    });

    it('sums miss of all games', () => {
      expect(totalMiss([
        {hits: [{miss: 3}, {miss: 5}]},
        {hits: [{miss: 2}]}
      ])).to.eq(10);
    });
  });

  describe('averageMissPercentage', () => {
    it('is 0 when no games', () => {
      expect(averageMissPercentage([])).to.eq(0);
    });

    it('averages misses of all games', () => {
      expect(averageMissPercentage([
        {hits: [{miss: 3}, {miss: 6}], frequency: 10},
        {hits: [{miss: 1}], frequency: 2}
      ])).to.eq(47.5);
    });
  });

  describe('openGames', () => {
    it('selects open and inFlight games', () => {
      expect(openGames([
        {id: 1, status: 'closed'},
        {id: 2, status: 'open'},
        {id: 3, status: 'inFlight'}
      ])).to.deep.eq([{id: 2, status: 'open'}, {id: 3, status: 'inFlight'}]);
    });
  });

  describe('reducer', () => {
    it('returns initial state upon unknown action', () => {
      expect(reducer(undefined, {type: 'unknown'}))
        .to.deep.include({loggedIn: false, playerName: undefined, games: []});
    });

    it('changes state to login upon LOGIN', () => {
      expect(reducer(undefined, {type: LOGIN, payload: 'name'}))
        .to.deep.include({loggedIn: true, playerName: 'name'});
    });

    it('adds in-flight game upon NEW_GAME_REQUESTED', () => {
      expect(reducer(undefined, {type: NEW_GAME_REQUESTED, payload: {frequency: 10, localId: 1}}))
        .to.deep.include({games: [{
          localId: 1,
          hits: [],
          status: 'inFlight',
          frequency: 10
        }]});
    });

    it('updates game upon NEW_GAME_SUCCEEDED', () => {
      const initialState = {
        games: [{
          localId: 1,
          hits: [],
          status: 'inFlight',
          frequency: 10
        }]
      };

      expect(reducer(initialState, {
        type: NEW_GAME_SUCCEEDED,
        payload: {
          id: 'actual ID',
          localId: 1
        }
      })).to.deep.include({games: [{
        id: 'actual ID',
        localId: undefined,
        hits: [],
        status: 'open',
        frequency: 10
      }]});
    });

    it('removes game upon NEW_GAME_FAILED', () => {
      const initialState = {
        games: [{
          localId: 1,
          hits: [],
          status: 'inFlight',
          frequency: 10
        }]
      };

      expect(reducer(initialState, {
        type: NEW_GAME_FAILED,
        payload: {
          localId: 1,
        }
      })).to.deep.include({games: []});
    });

    it('changes game to closed upon CLOSE_GAME', () => {
      const initialState = {
        loggedIn: true,
        name: 'name',
        games: [{
          id: 0,
          hits: [],
          status: 'inFlight',
          frequency: 10
        }]
      };

      expect(reducer(initialState, {type: CLOSE_GAME, payload: 0}))
        .to.deep.include({
          games: [{
            id: 0,
            hits: [],
            status: 'closed',
            frequency: 10
          }]
        });
    });

    it('adds hit upon RECORD_HIT_REQUESTED', () => {
      const initialState = {
        loggedIn: true,
        name: 'name',
        games: [{
          id: 0,
          hits: [],
          status: 'open',
          frequency: 10
        }]
      };

      expect(reducer(initialState, {type: RECORD_HIT_REQUESTED, payload: {gameId: 0}}))
        .to.deep.include({
          games: [{
            id: 0,
            hits: [{status: 'inFlight'}],
            status: 'open',
            frequency: 10
          }]
        });
    });

    it('replaces hits upon RECORD_HIT_SUCCEEDED', () => {
      const initialState = {
        games: [{
          id: 0,
          hits: [{localId: 10, status: 'inFlight'}],
          status: 'open',
          frequency: 10
        }]
      };
      expect(reducer(initialState, {
        type: RECORD_HIT_SUCCEEDED,
        payload: {gameId: 0, hits: [{miss: 30}]}
      }))
        .to.deep.include({
          games: [{
            id: 0,
            hits: [{miss: 30}],
            status: 'open',
            frequency: 10
          }]
        });
    });

    it('removes hit upon RECORD_HIT_FAILED', () => {
      const initialState = {
        games: [{
          id: 0,
          hits: [{localId: 10, status: 'inFlight'}],
          status: 'open',
          frequency: 10
        }]
      };
      expect(reducer(initialState, {
        type: RECORD_HIT_FAILED,
        payload: {gameId: 0}
      }))
        .to.deep.include({
          games: [{
            id: 0,
            hits: [],
            status: 'open',
            frequency: 10
          }]
        });
    });
  });
});
