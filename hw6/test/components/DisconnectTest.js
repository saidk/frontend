import React from 'react';
import {shallow} from 'enzyme';

import DisconnectButton from '../../src/components/DisconnectButton';

describe('DisconnectButton', () => {
    it('renders successfully', () => {
        expect(shallow(<DisconnectButton onHit={sinon.stub()}/>)).to.exist;
    });
});
