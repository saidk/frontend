import React from 'react';
import PropTypes from 'prop-types';
import LoginForm from '../components/LoginForm';
import '../../css/index.css';
import {connect} from 'react-redux';
import {CONNECT_REQUESTED} from '../actions/Actions';
import Games from './Games';
import Controls from './Controls';
import OnlinePlayers from '../components/OnlinePlayers';
import AppHeader from '../components/AppHeader';
import {ConnectedRouter} from 'connected-react-router';
import {Route} from 'react-router-dom';
import GameContainer from '../containers/Game';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.loginForm = React.createRef();
    }

    componentDidMount() {
        this.loginForm.current.focus();
    }

    render() {
        if (this.props.connectionStatus === 'disconnected') {
            return <LoginForm
                ref={this.loginForm}
                onEnter={this.props.login}
                disconnectReason={this.props.disconnectReason}
            />;
        } else if (this.props.connectionStatus === 'connecting') {
            return <div className="instructions">Connecting...</div>;
        } else {
            return (
                <ConnectedRouter history={this.props.history}>
                    <div className="app">
                        <AppHeader/>
                        <Route path="/players" component={() => <OnlinePlayers players={this.props.players} />}/>
                        <Controls history={this.props.history}/>
                        <Route path="/ongoingGames" component={() => <Games gameStatus={true} />}/>
                        <Route path="/closedGames" component={() => <Games gameStatus={false} />}/>
                        <Route path="/games/:gameId" component={GameContainer} />
                    </div>
                </ConnectedRouter>
            );
        }
    }
}

App.propTypes = {
    connectionStatus: PropTypes.string.isRequired,
    login: PropTypes.func.isRequired,
    players: PropTypes.array,
    disconnectReason: PropTypes.string,
    history: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    connectionStatus: state.connection.status,
    disconnectReason: state.connection.disconnectReason,
    players: state.players
});

const mapDispatchToProps = (dispatch) => ({
    login: ({name}) => dispatch({type: CONNECT_REQUESTED, payload: name})
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
