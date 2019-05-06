import React, {Fragment} from 'react';
import Instructions from '../components/Instructions';
import NewGameForm from '../components/NewGameForm';
import {connect} from 'react-redux';
import {newGame, DISCONNECT} from '../actions/Actions';
import PropTypes from 'prop-types';
import {totalMiss, averageMissPercentage} from '../reducers/Reducer';
import DisconnectButton from '../components/DisconnectButton';
import OnlinePlayers from '../components/OnlinePlayers';

const Controls = (props) => {
    return (
        <Fragment>
            <OnlinePlayers players={props.currentPlayer, props.playerList}/>
            <DisconnectButton disconnect={props.disconnect}/>
            <Instructions
                name={props.playerName}
                totalMiss={props.totalMiss}
                averageMissPercentage={props.averageMissPercentage}
            />
            <NewGameForm onStart={props.newGame}/>
        </Fragment>
    );
};

Controls.propTypes = {
    totalMiss: PropTypes.number.isRequired,
    averageMissPercentage: PropTypes.number.isRequired,
    playerName: PropTypes.string.isRequired,
    newGame: PropTypes.func.isRequired,
    disconnect: PropTypes.func.isRequired,
    playerList: PropTypes.array.isRequired,
    currentPlayer: PropTypes.string,
};

const mapStateToProps = (state) => ({
    games: state.reducer.games,
    playerName: state.reducer.playerName,
    totalMiss: totalMiss(state.reducer.games),
    averageMissPercentage: averageMissPercentage(state.reducer.games),
    currentPlayer: state.reducer.playerId,
    playerList: state.reducer.playerList
});

const mapDispatchToProps = (dispatch) => ({
    newGame: ({frequency}) => dispatch(newGame(frequency)),
    disconnect: () => dispatch({type: DISCONNECT})
});

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
