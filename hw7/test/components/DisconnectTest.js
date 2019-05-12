import React from 'react';
import {shallow} from 'enzyme';

import Disconnect from '../../src/components/Disconnect';

describe('Disconnect', () => {
  it('renders successfully', () => {
    expect(shallow(<Disconnect disconnect={sinon.stub()} />)).to.exist;
  });

  it('calls back when button clicked', () => {
    const disconnect = sinon.stub();
    const form = shallow(<Disconnect disconnect={disconnect} />);

    form.find('button').simulate('click');

    expect(disconnect).to.have.been.called;
  });
});
