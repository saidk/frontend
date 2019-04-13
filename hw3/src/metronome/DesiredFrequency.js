import React, {useState, useRef, forwardRef, useImperativeHandle} from 'react';
import PropTypes from 'prop-types';


let DesiredFrequency = (props, ref) => {
  const [frequency, setFrequency] = useState('');
  const onFrequencyChange = (event) => setFrequency(event.target.value);


  const submit = () => {
    setFrequency('');
    props.onSubmit({frequency});
  };

  const desiredFrequency = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => {
      desiredFrequency.current.focus();
    }
  }));

  return (
    <div className='comment-form'>
      <input
        ref={desiredFrequency}
        name="frequency"
        type="text"
        placeholder="Desired frequency"
        value={frequency}
        onChange={onFrequencyChange}
      />
      <button type='submit' onClick={submit}>
        Start
      </button>
    </div>
  );
};

DesiredFrequency = forwardRef(DesiredFrequency);

DesiredFrequency.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  text: PropTypes.string
};

export default DesiredFrequency;
