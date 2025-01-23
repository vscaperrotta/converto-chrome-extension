import React from 'react';

function Switch({
  onClick = () => { }
}) {
  return (
    <div className='switch__container'>
      <button onClick={onClick}>switch</button>
    </div>
  );
}

export default Switch;