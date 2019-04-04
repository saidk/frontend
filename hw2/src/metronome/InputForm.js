import React, {Component} from 'react';
import PropTypes from 'prop-types';


class InputForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerName: ''
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  handlePlayerNameChange(event) {
    this.setState({playerName: event.target.value});
  }

  onSubmit() {
    this.props.onSubmit({playerName: this.state.playerName, text: this.state.text});
  }

  render() {
    return (
      <div className='comment-form'>
        <input
          type="text"
          placeholder="Your name"
          value={this.state.playerName}
          onChange={this.handlePlayerNameChange.bind(this)}
        />
        <button className='comment-form' onClick={this.onSubmit}>
          START
        </button>
      </div>
    );
  }
}
InputForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default InputForm;
