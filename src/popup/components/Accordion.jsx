import { useState } from 'react';

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
          <h3 className='accordion__label'>
            {label}
          </h3>
          <p className='accordion__caption'>
            {caption}
          </p>
        </div>
        <button
          className='accordion__button'
          onClick={() => handleClick()}
        >
          {expanded ? 'close' : 'open'}
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