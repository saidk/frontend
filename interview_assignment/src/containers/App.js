import React from 'react';
import '../../css/index.css';
import {connect} from 'react-redux';
import {LOGIN} from '../actions/Actions';
import PropTypes from 'prop-types';
import Products from './Products';
import Controls from './Controls';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="app">
                {/*<Controls/>*/}
                <Products/>
            </div>
        );
    }
}

App.propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    login: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    loggedIn: state.loggedIn
});

const mapDispatchToProps = (dispatch) => ({
    login: ({name}) => dispatch({type: LOGIN, payload: name})
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
