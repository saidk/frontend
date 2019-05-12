import React, {Fragment} from 'react';
import Instructions from '../components/Instructions';
import NewGameForm from '../components/NewGameForm';
import {connect} from 'react-redux';
import {newGame} from '../actions/Actions';
import PropTypes from 'prop-types';
import {totalMiss, averageMissPercentage} from '../reducers/Reducer';

const Controls = (props) => {
  return (
    <Fragment>
      <Instructions
        name={props.playerName}
        totalMiss={props.totalMiss}
        averageMissPercentage={props.averageMissPercentage}
      />
      <NewGameForm onStart={props.newGame} />
    </Fragment>
  );
};

Controls.propTypes = {
  totalMiss: PropTypes.number.isRequired,
  averageMissPercentage: PropTypes.number.isRequired,
  playerName: PropTypes.string.isRequired,
  newGame: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  games: state.games,
  playerName: state.playerName,
  totalMiss: totalMiss(state.games),
  averageMissPercentage: averageMissPercentage(state.games)
});

const mapDispatchToProps = (dispatch) => ({
  newGame: ({frequency}) => dispatch(newGame(frequency))
});

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
