import React from 'react';
import {shallow} from 'enzyme';

import NewGameForm from '../../src/components/NewGameForm';

describe('NewGameForm', () => {
  it('renders successfully', () => {
    expect(shallow(<NewGameForm onStart={sinon.stub()} />)).to.exist;
  });
});
