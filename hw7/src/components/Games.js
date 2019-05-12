import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {isInFlight} from '../reducers/GamesReducer';

export const GameInFlight = () => <div>Game is being created...</div>;

const Games = (props) => {
    const games = props.games
        .map((game, index) => {
            if (isInFlight(game)) {
                return <GameInFlight key={index}/>;
            } else if (props.gameStatus.gameStatus === true && game.status === 'open') {
                return (
                    <li key={game.id}>
                        <Link to={`/games/${game.id}`}>Frequency: {game.frequency}</Link>
                    </li>
                );
            } else if (props.gameStatus.gameStatus === false && game.status === 'closed') {
                return (
                    <li key={game.id}>
                        <Link to={`/games/${game.id}`}>Frequency: {game.frequency}</Link>
                    </li>
                );
            }
        });
    return (
        <div className="games">
            {games}
        </div>
    );
};

Games.propTypes = {
    games: PropTypes.array.isRequired,
    closeGame: PropTypes.func.isRequired,
    recordHit: PropTypes.func.isRequired,
    gameStatus: PropTypes.object.isRequired,
};

export default Games;
