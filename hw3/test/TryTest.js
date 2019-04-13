import React from 'react';
import {shallow} from 'enzyme';

import Try from '../src/metronome/Try';

describe('Try', () => {
  it('renders', () => {
    // App Header component has no logic or control flow. There isn't much
    // point to test the exact markup that it outputs.
    expect(shallow(<Try key={1} milliSeconds={222} id={1} />)).to.exist;
  });
});
