import React from 'react';
import {shallow} from 'enzyme';

import LoginForm from '../src/LoginForm';

describe('LoginForm', () => {
  it('renders successfully', () => {
    expect(shallow(<LoginForm onEnter={sinon.stub()} />)).to.exist;
  });

  it('calls back with provided name', () => {
    const onEnter = sinon.stub();
    const form = shallow(<LoginForm onEnter={onEnter} />);
    const name = 'some-name';

    form.find('input').simulate('change', {target: {value: name}});
    form.find('button').simulate('click');

    expect(onEnter).to.have.been.calledWith({name: name});
  });
});
