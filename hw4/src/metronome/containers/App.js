import React from 'react';
import PropTypes from 'prop-types';

import LoginForm from '../components/LoginForm';

import {connect} from 'react-redux';
import {login, addGame, closeGame, recordHit} from '../actions';
import Instructions from '../components/Instructions';
import NewGameForm from '../components/NewGameForm';
import MetronomeGame from '../components/MetronomeGame';
import '../../../css/index.css';


const App = (props) => {
    const games = props.games
        .map((game, index) =>
            <MetronomeGame
                key={index}
                frequencyMs={game.frequency}
                hits={game.hits}
                onHit={() => props.recordHit({gameId: game.id})}
                onClose={() => props.closeGame({gameId: game.id})}
            />
        );
    const totalMiss = props.games.reduce(
        (acc, game) => acc + game.hits.reduce((hitAcc, hit) => hitAcc + hit.miss, 0),
        0
    );
    const averageMiss = props.games.reduce(
        (acc, game) => totalMiss/game.hits.length,
        0
    );
    return (
        <div>
            {!props.isSubmitted && <LoginForm onEnter={props.login}/>}
            {props.isSubmitted && <div className="app">
                <Instructions name={props.name} totalMiss={totalMiss} averageMiss={averageMiss}/>
                <NewGameForm onStart={props.addGame} />
                <div className="games">
                    {games}
                </div>
            </div>}
        </div>
    );
};

App.propTypes = {
    games: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    isSubmitted: PropTypes.bool.isRequired,
    login: PropTypes.func.isRequired,
    addGame: PropTypes.func.isRequired,
    closeGame: PropTypes.func.isRequired,
    recordHit: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        isSubmitted: state.isSubmitted,
        name: state.name,
        games: state.games,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (name) => dispatch(login(name)),
        addGame: (frequency) => dispatch(addGame(frequency)),
        closeGame: (gameId) => dispatch(closeGame(gameId)),
        recordHit: (gameId) => dispatch(recordHit(gameId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
