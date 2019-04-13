import React from 'react';
import ReactDOM from 'react-dom';
import Metronome from './metronome/App';
import '../css/index.css';


const currentApp = <Metronome />;

ReactDOM.render(currentApp, document.getElementById('root'));
