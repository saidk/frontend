import React, {useState, forwardRef, useImperativeHandle, useRef} from 'react';
import PropTypes from 'prop-types';


let InputForm = (props, ref) => {
  const [playerName, setPlayerName] = useState('');
  const onPlayerNameChange = (event) => setPlayerName(event.target.value);


  const submit = () => {
    setPlayerName('');
    props.onSubmit({playerName});
  };
  const inputForm = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputForm.current.focus();
    }
  }));
  return (
    <div className='comment-form'>
      <input name="player"
        ref={inputForm}
        type="text"
        placeholder="Your name"
        value={playerName}
        onChange={onPlayerNameChange}
      />
      <button type='submit' onClick={submit}>
        Log in
      </button>
    </div>
  );
};

InputForm = forwardRef(InputForm);

InputForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default InputForm;
