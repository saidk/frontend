import Metronome from '../src/Metronome.js';

let metronome = new Metronome();
describe('getCount', () => {
  it('check if it is iterating', () => {
    expect(metronome.getCount()).to.eql(1);
  });
});

describe('createTimeDiff', () => {
  let currentDate = new Date();

  it('check if it is number', () => {
    expect(metronome.createTimeDiff()).to.be.a('number');
  });
});
