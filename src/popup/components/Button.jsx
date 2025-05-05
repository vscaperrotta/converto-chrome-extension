import React from 'react';

function Button({
  onClick = () => { },
  icon = undefined
}) {
  return (
    <div className='button__container'>
      <button className='button__button' onClick={onClick}>
        {icon !== undefined ? icon : undefined}
      </button>
    </div>
  );
}

export default Button;