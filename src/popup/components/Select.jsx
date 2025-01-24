import React from 'react';

function Select({
  id = '',
  label = '',
  value = '',
  onChange = () => { },
  options = []
}) {
  return (
    <div className='select__container'>
      <select
        className='select__field'
        name={id}
        id={id}
        value={value}
        onChange={onChange}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;