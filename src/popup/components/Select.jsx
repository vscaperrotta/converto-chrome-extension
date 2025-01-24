import { useEffect, useState } from "react";
import ArrowIcon from '@assets/arrow.png';

function Select({
  id = '',
  label = '',
  options = [],
  onChange = () => { },
  value = ''
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const found = options.find((opt) => opt.value === value);
    setSelected(found || null);
  }, [value, options]);

  const handleSelect = (option) => {
    setIsOpen(false);
    onChange(option);
  };

  useEffect(() => {
    console.log(selected)
  }, [selected]);

  return (
    <div id={id} className="select__container">
      {label && <label className="select__label">{label}</label>}

      <button
        type="button"
        className="select__toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected ? selected.label : "—"}
        <img
          src={ArrowIcon}
          className={`select__arrow ${isOpen ? 'open' : ''}`}
          alt=""
        />
      </button>

      {isOpen && (
        <ul className="select__menu">
          {options.map((option) => (
            <li
              key={option.value}
              className={`select__option ${option.value === selected.value ? 'selected' : ''}`}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Select;
