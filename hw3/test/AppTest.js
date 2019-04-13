import React from 'react';
import {shallow} from 'enzyme';

import App from '../src/metronome/App';
import TotalMiss from '../src/metronome/TotalMiss';
import InputForm from '../src/metronome/InputForm';

describe('App', () => {
  it('initially renders Total Miss zero', () => {
    // `to.contain` checks that an exactly equal component exists
    const app = shallow(<App focusForms={false} />);
    app.find(InputForm).props().onSubmit('aaaaa');
    app.update();
    expect(app).to.contain(
      <TotalMiss totalMiss={0} />
    );
  });

  it('renders InputForm', () => {
    // `to.contain.descendants` checks that an element with a specified type
    // exists (props are not checked)
    expect(
      shallow(<App />)
    ).to.contain.descendants(
      InputForm
    );
  });


  // it('check name', () => {
  //   const app = shallow(<App focusForms={false} />);
  //   app.find(InputForm).props().onSubmit('aaaaa');
  //   app.update();
  //
  //   expect(app).to.contain(
  //     <Greeting playerName="aaaaa"/>
  //   );
  // });
});
