import React, {Component} from 'react';
import PropTypes from 'prop-types';


class Now extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit() {
    this.props.onSubmit({milliSeconds: this.createTimeDiff()});
  }
  createTimeDiff() {
    const currentDate = new Date();
    this._milliSeconds = currentDate.getMilliseconds();
    return this._milliSeconds;
  }
  render() {
    return (
      <div className='comment-form'>
        <button className='comment-form' onClick={this.onSubmit}>
          NOW
        </button>
      </div>
    );
  }
}
Now.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Now;
