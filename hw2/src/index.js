import React from 'react';
import ReactDOM from 'react-dom';

import '../css/index.css';

import MetronomeApp from './metronome/App';


const currentApp = <MetronomeApp />;

ReactDOM.render(currentApp, document.getElementById('root'));
