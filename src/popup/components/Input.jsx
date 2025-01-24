import React from 'react';

function Input({
  id = '',
  label = '',
  value = '',
  onChange = () => { },
  placeholder = '',
  convertion = false
}) {
  return (
    <div className='input__container'>
      <input
        name={id}
        id={id}
        value={value}
        onChange={onChange}
        className={`input__field ${convertion ? 'input__field--convertion' : ''}`}
        placeholder={placeholder}
        type='number'
        inputMode="numeric"
      />
    </div>
  );
}

export default Input;