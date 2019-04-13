import React, {Component} from 'react';

import PropTypes from 'prop-types';
import InputForm from './InputForm';
import Greeting from './Greeting';
import TotalMiss from './TotalMiss';
import DesiredFrequency from './DesiredFrequency';
import GameList from './GameList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player: '',
      isSubmitted: false,
      totalMiss: 0,
      gameListShow: false,
      games: [],
      lastGameId: 0,
    };
    // this.addGame = this.addComment.bind(this);
    this.desiredFrequency = React.createRef();
    this.inputForm = React.createRef();
    this.desiredFrequency = React.createRef();
  }

  handleInputSubmit({playerName}) {
    if (playerName === '') {
      alert('Please write your name');
    } else {
      this.setState({
        player: playerName,
        isSubmitted: true
      });
    }
  }
  addGame(desiredFrequency) {
    const newGameId = this.state.lastGameId + 1;
    const newGames = this.state.games.concat({...desiredFrequency, id: newGameId});
    this.setState({
      lastGameId: newGameId,
      games: newGames
    });
  }
  totalMiss(total) {
    this.setState({totalMiss: this.state.totalMiss + total.miss});
  }
  render() {
    return (
      <div className='app'>
        {this.state.isSubmitted && <Greeting playerName={this.state.player}/>}
        {this.state.isSubmitted && <TotalMiss totalMiss={this.state.totalMiss}/>}
        {this.state.isSubmitted && <DesiredFrequency
          ref={this.desiredFrequency}
          onSubmit={(desiredFrequency) => {
            this.addGame(desiredFrequency);
            if (this.props.focusForms) {
              this.desiredFrequency.current.focus();
            }
          }}/>}
        {!this.state.isSubmitted && <InputForm
          ref={this.inputForm}
          onSubmit={(playerName) => {
            this.handleInputSubmit(playerName);
            if (this.props.focusForms) {
              this.inputForm.current.focus();
            }
          }}/>}
        {this.state.isSubmitted && <GameList games={this.state.games}
          totalMiss={(total) => {
            this.totalMiss(total);
          }}

        />}
      </div>
    );
  }
}

App.propTypes = {
  focusForms: PropTypes.bool.isRequired
};

App.defaultProps = {
  focusForms: true
};

export default App;
