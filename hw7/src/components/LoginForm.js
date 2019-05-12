import React, {forwardRef, useRef, useImperativeHandle, useState} from 'react';
import PropTypes from 'prop-types';

const reasonToText = {
  'player-name-taken': 'Player name is already taken, please choose another one'
};

const LoginForm = forwardRef(({onEnter, disconnectReason}, ref) => {
  const [name, setName] = useState('');
  const handleNameChange = (event) => setName(event.target.value);

  const handleStart = () => onEnter({name: name});
  const nameInput = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => {
      nameInput.current.focus();
    }
  }));

  const disconnectExplanation = disconnectReason ?
    <div>{reasonToText[disconnectReason]}</div> :
    null;

  return (
    <div className="loginForm">
      <input ref={nameInput} type='text' value={name} onChange={handleNameChange} placeholder="Your name"/>
      <button onClick={handleStart}>Log in</button>
      {disconnectExplanation}
    </div>
  );
});


LoginForm.propTypes = {
  disconnectReason: PropTypes.string,
  onEnter: PropTypes.func.isRequired
};

export default LoginForm;
