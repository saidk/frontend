import React from 'react';
import LoginForm from '../components/LoginForm';
import '../../css/index.css';
import {connect} from 'react-redux';
import {LOGIN} from '../actions/Actions';
import PropTypes from 'prop-types';
import Games from './Games';
import Controls from './Controls';
import PlayerConnecting from '../components/PlayerConnecting';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.loginForm = React.createRef();
  }

  componentDidMount() {
    this.loginForm.current.focus();
  }
  render() {
    if (!this.props.loggedIn) {
      return <LoginForm ref={this.loginForm} onEnter={this.props.login}/>;
    } else if (this.props.status === 'connecting') {
      return <PlayerConnecting/>;
    } else {
      return (
        <div className="app">
          <Controls />
          <Games />
        </div>
      );
    }
  }
}

App.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired
};

const mapStateToProps = (state) => {
  return ({
    loggedIn: state.reducer.loggedIn,
    status: state.connection.status
  });
};

const mapDispatchToProps = (dispatch) => ({
  login: ({name}) => dispatch({type: LOGIN, payload: name})
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
