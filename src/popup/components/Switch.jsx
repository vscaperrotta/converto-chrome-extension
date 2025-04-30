import React from 'react';
import { Repeat } from 'react-feather';

function Switch({
  onClick = () => { }
}) {
  return (
    <div className='switch__container'>
      <button className='switch__button' onClick={onClick}>
        <Repeat size={20} />
      </button>
    </div>
  );
}

export default Switch;