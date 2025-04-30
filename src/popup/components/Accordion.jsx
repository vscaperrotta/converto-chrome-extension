import { useState } from 'react';
import { ChevronDown } from 'react-feather';

function Accordion({
  label = '',
  caption = '',
  children = null
}) {
  const [expanded, setExpanded] = useState(false);

  function handleClick() {
    setExpanded(expanded => !expanded);
  }

  return (
    <div className='accordion__container'>
      <div className='accordion__header' >
        <div className='accordion__copies'>
          <h4 className='accordion__label'>
            {label}
          </h4>
          <p className='accordion__caption'>
            {caption}
          </p>
        </div>
        <button
          className={`accordion__button ${expanded ? 'close' : 'open'}`}
          onClick={() => handleClick()}
        >
          <ChevronDown size={32} />
        </button>
      </div>
      {expanded && (
        <div className='accordion__content'>
          {children}
        </div>
      )}
    </div>
  );
}

export default Accordion;