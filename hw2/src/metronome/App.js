import React, {Component} from 'react';

import InputForm from './InputForm';
import Greeting from './Greeting';
import Now from './Now';
import TriesList from './TriesList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player: '',
      isSubmitted: false,
      tries: []
    };
  }

  handleInputSubmit({playerName}) {
    if (playerName === '') {
      alert('Please write your name');
    } else {
      this.setState({
        player: playerName
      });
      this.setState({
        isSubmitted: true
      });
    }
  }

  handleTrySubmit({milliSeconds}) {
    let lastCommentId = 0;
    if (this.state.tries.length > 0) {
      const lastComment = this.state.tries[this.state.tries.length - 1];
      lastCommentId = lastComment.id;
    }
    let color = '';
    if (milliSeconds > 0 && milliSeconds < 100) {
      color = 'green';
    } else if (milliSeconds > 200) {
      color = 'red';
    } else {
      color = 'orange';
    }
    this.setState({
      tries: this.state.tries.concat([
        {milliSeconds: milliSeconds, id: lastCommentId + 1, color: color},
      ])
    });
  }

  render() {
    return (
      <div className='app'>
        {this.state.isSubmitted && <Greeting playerName={this.state.player}/>}
        {this.state.isSubmitted && <Now onSubmit={this.handleTrySubmit.bind(this)}/>}
        {this.state.isSubmitted && <TriesList tries={this.state.tries}/>}
        {!this.state.isSubmitted && <InputForm onSubmit={this.handleInputSubmit.bind(this)}/>}
      </div>
    );
  }
}

export default App;
