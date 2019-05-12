import React from 'react';
import {Link} from 'react-router-dom';

const Header = () => {
  return (
    <div className='app-header'>
      <h1>Metronome</h1>
      <ul>
        <li><Link to="/players">Players</Link></li>
        <li><Link to="/createGame">Create Game</Link></li>
        <li><Link to="/ongoingGames">Ongoing Games</Link></li>
        <li><Link to="/closedGames">Closed Games</Link></li>
      </ul>
    </div>
  );
};

export default Header;
