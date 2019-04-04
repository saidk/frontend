import Metronome from './Metronome.js';

window.onload = function() {
  const button = document.createElement('BUTTON');
  document.body.style.display = 'flex';
  document.body.style.alignItems = 'center';
  document.body.style.justifyContent = 'center';
  button.innerHTML = 'Time diff: 0; count: 0';
  document.body.appendChild(button);
  const metronome = new Metronome();

  button.onclick = function() {
    button.innerHTML = 'Time diff: ' + metronome.createTimeDiff() + '; count: ' + metronome.getCount();
  };
};
