import React, {Fragment} from 'react';
import Instructions from '../components/Instructions';
import NewGameForm from '../components/NewGameForm';
import Disconnect from '../components/Disconnect';
import {connect} from 'react-redux';
import {newGame, DISCONNECT_REQUESTED} from '../actions/Actions';
import PropTypes from 'prop-types';
import {totalMiss, averageMissPercentage} from '../reducers/GamesReducer';
import {ConnectedRouter} from 'connected-react-router';
import {Route} from 'react-router-dom';

const Controls = (props, history) => {
    return (
        <ConnectedRouter history={props.history}>
            <Fragment>
                <Disconnect disconnect={props.disconnect}/>
                <Instructions
                    name={props.playerName}
                    totalMiss={props.totalMiss}
                    averageMissPercentage={props.averageMissPercentage}
                />
                <Route path="/createGame" component={() => <NewGameForm onStart={props.newGame} />}/>
            </Fragment>
        </ConnectedRouter>
    );
};

Controls.propTypes = {
    totalMiss: PropTypes.number.isRequired,
    averageMissPercentage: PropTypes.number.isRequired,
    playerName: PropTypes.string.isRequired,
    newGame: PropTypes.func.isRequired,
    disconnect: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    games: state.games,
    playerName: state.connection.playerName,
    totalMiss: totalMiss(state.games),
    averageMissPercentage: averageMissPercentage(state.games)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    newGame: ({frequency}) => {
        dispatch(newGame(frequency));
        ownProps.history.push('/ongoingGames');
    },
    disconnect: () => dispatch({type: DISCONNECT_REQUESTED})
});

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
