import React from 'react';
import {shallow} from 'enzyme';

import OnlinePlayers from '../../src/components/OnlinePlayers';


describe('OnlinePlayers', () => {
    it('renders empty players list', () => {
        expect(shallow(<OnlinePlayers players={[]} currentPlayerId={'100'} />)).to.exist;
    });
});
