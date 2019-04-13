import React, {forwardRef, useRef, useImperativeHandle, useState} from 'react';
import PropTypes from 'prop-types';

const LoginForm = forwardRef(({onEnter}, ref) => {
  const [name, setName] = useState('');
  const handleNameChange = (event) => setName(event.target.value);

  const handleStart = () => onEnter({name: name});
  const nameInput = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => {
      nameInput.current.focus();
    }
  }));

  return (
    <div className="loginForm">
      <input ref={nameInput} type='text' value={name} onChange={handleNameChange} placeholder="Your name"/>
      <button onClick={handleStart}>Log in</button>
    </div>
  );
});


LoginForm.propTypes = {
  onEnter: PropTypes.func.isRequired
};

export default LoginForm;
