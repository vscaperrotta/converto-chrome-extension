import { useEffect, useState } from "react";
import { ChevronDown } from "react-feather";

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

  return (
    <div id={id} className="select__container">
      {label && <label className="select__label">{label}</label>}

      <button
        type="button"
        className={`select__toggle ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected ? selected.label : "—"}
        <ChevronDown size={32} />
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
