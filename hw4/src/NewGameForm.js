import React, {useState} from 'react';
import PropTypes from 'prop-types';

const NewGameForm = ({onStart}) => {
  const [frequency, setFrequency] = useState('');
  const handleFrequencyChange = (event) => setFrequency(event.target.value);
  const handleStart = () => {
    setFrequency('');
    onStart({frequency: parseInt(frequency)});
  };

  return (
    <div className="newGameForm">
      <input type='number' value={frequency} onChange={handleFrequencyChange} placeholder="Desired frequency"/>
      <button onClick={handleStart}>START</button>
    </div>
  );
};

NewGameForm.propTypes = {
  onStart: PropTypes.func.isRequired
};

export default NewGameForm;
