import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TriesList from './TriesList';


class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      frequency: props.frequency,
      tries: [],
      lastTryId: 0,
    };
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit() {
    const newTryId = this.state.lastTryId + 1;
    const newTries = this.state.tries.concat({milliSeconds: this.createTimeDiff(), id: newTryId});
    this.setState({
      lastTryId: newTryId,
      tries: newTries
    });
    this.totalMiss(this.createTimeDiff());
  }
  totalMiss(miss) {
    this.props.totalMiss({miss});
  }
  createTimeDiff() {
    const currentDate = new Date();
    const milliSeconds = currentDate.getMilliseconds();
    return milliSeconds % this.state.frequency;
  }
  closeGame() {
    const game = document.querySelector('.games');
    game.remove();
  }
  render() {
    return (
      <div className="games">
        <p> Click the button exactly every {this.state.frequency}</p>
        <button onClick={this.closeGame}>
          close
        </button>
        <button className='comment-form' onClick={this.onSubmit}>
                    NOW
        </button>
        <TriesList tries={this.state.tries}/>
      </div>
    );
  }
}
Game.propTypes = {
  frequency: PropTypes.node.isRequired,
};

export default Game;
