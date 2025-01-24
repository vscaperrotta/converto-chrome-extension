import React from 'react';
import SwitchIcon from '@assets/switch.png'

function Switch({
  onClick = () => { }
}) {
  return (
    <div className='switch__container'>
      <button className='switch__button' onClick={onClick}>
        <img src={SwitchIcon} alt="switch icon" />
      </button>
    </div>
  );
}

export default Switch;