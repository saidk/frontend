import React from 'react';
import MetronomeGame from './MetronomeGame';
import LoginForm from './LoginForm';
import NewGameForm from './NewGameForm';
import Instructions from './Instructions';
import '../css/index.css';
import {adjustBy} from './PureFunctions';

const calculateMiss = (startMilliseconds, nowMilliseconds, frequency) => {
  const remainder = (nowMilliseconds - startMilliseconds) % frequency;
  if (remainder >= frequency / 2) {
    return frequency - remainder;
  } else {
    return remainder;
  }
};

const recordHit = (game, millisNow) =>
  ({...game,
    hits: game.hits.concat([{
      miss: calculateMiss(game.startMilliseconds, millisNow, game.frequency)
    }])
  });

class App extends React.Component {
  constructor(props) {
    super(props);
    this.addGame = this.addGame.bind(this);
    this.state = {
      loggedIn: false,
      games: []
    };
    this.login = this.login.bind(this);
    this.recordHit = this.recordHit.bind(this);
    this.closeGame = this.closeGame.bind(this);
    this.addGame = this.addGame.bind(this);
    this.loginForm = React.createRef();
  }

  addGame({frequency}) {
    this.setState({
      games: this.state.games.concat({
        id: this.state.games.length,
        hits: [],
        open: true,
        frequency: frequency,
        startMilliseconds: Date.now()
      })
    });
  }

  closeGame({gameId}) {
    const newGames = adjustBy(
      (game) => game.id === gameId,
      (game) => ({...game, open: false}),
      this.state.games
    );
    this.setState({games: newGames});
  }

  login({name}) {
    this.setState({name: name, loggedIn: true});
  }

  recordHit({gameId}) {
    const millisNow = Date.now();
    const newGames = adjustBy(
      (game) => game.id === gameId,
      (game) => recordHit(game, millisNow),
      this.state.games,
    );
    this.setState({games: newGames});
  }

  componentDidMount() {
    this.loginForm.current.focus();
  }

  render() {
    if (!this.state.loggedIn) {
      return <LoginForm ref={this.loginForm} onEnter={this.login}/>;
    } else {
      const games = this.state.games
        .filter((game) => game.open)
        .map((game, index) =>
          <MetronomeGame
            key={index}
            frequencyMs={game.frequency}
            hits={game.hits}
            onHit={() => this.recordHit({gameId: game.id})}
            onClose={() => this.closeGame({gameId: game.id})}
          />
        );

      const totalMiss = this.state.games.reduce(
        (acc, game) => acc + game.hits.reduce((hitAcc, hit) => hitAcc + hit.miss, 0),
        0
      );

      return (
        <div className="app">
          <Instructions name={this.state.name} totalMiss={totalMiss} />
          <NewGameForm onStart={this.addGame} />
          <div className="games">
            {games}
          </div>
        </div>
      );
    }
  }
}

export default App;
