import React from 'react';
import {shallow} from 'enzyme';

import Instructions from '../src/Instructions';

describe('Instructions', () => {
  it('renders successfully', () => {
    expect(shallow(<Instructions name='foo' totalMiss={5} />)).to.exist;
  });
});
