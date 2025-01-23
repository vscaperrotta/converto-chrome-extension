import React from 'react';

function Input({
  id = '',
  label = '',
  value = '',
  onChange = () => { },
  placeholder = '',
  type = 'text',
}) {
  return (
    <div>
      <label htmlFor="">{label}</label>
      <input
        name={id}
        id={id}
        value={value}
        onChange={onChange}
        className={'input'}
        placeholder={placeholder}
        type={type}
      />
    </div>
  );
}

export default Input;