class Metronome {
  constructor() {
    this._count = 0;
  }

  createTimeDiff() {
    const currentDate = new Date();
    this._milliSeconds = currentDate.getMilliseconds();
    return this._milliSeconds;
  }

  getCount() {
    this._count = this._count + 1;
    return this._count;
  }
}

export default Metronome;
