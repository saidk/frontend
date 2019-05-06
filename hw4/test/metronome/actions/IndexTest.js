import {login} from '../../../src/metronome/actions/index';

describe('login', () => {
    it('change loggedIn', () => {
        const submissions = [
            login('aaa'),
        ];
        expect(submissions[0].loggedIn).to.eq(
           true
        );
    });
});
