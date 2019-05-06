import React from 'react';
import PropTypes from 'prop-types';


const DisconnectButton = ({disconnect}) => {
    return (
        <div className='disconnectButton'>
            <button onClick={disconnect}>Disconnect</button>
        </div>
    );
};

DisconnectButton.propTypes = {
    disconnect: PropTypes.func.isRequired
};

export default DisconnectButton;
