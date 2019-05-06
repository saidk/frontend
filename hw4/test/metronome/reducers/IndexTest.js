import reducer from '../../../src/metronome/reducers/index';
import {
    login
} from '../../../src/metronome/actions/index';

// Note that reducer tests have nothing to do with React.

describe('reducer', () => {
    it('has no games and name initially', () => {
        expect(reducer(undefined, {})).to.eql({
            isSubmitted: false,
            name: '',
            games: []
        });
    });
    it('after login isSubmitted true', () => {
        expect(reducer(undefined, login('text')).isSubmitted).to.eql(true);
    });
});
