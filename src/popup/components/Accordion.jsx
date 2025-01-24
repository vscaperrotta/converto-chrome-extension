import { useState } from 'react';
import ArrowIcon from '@assets/arrow.png';

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
          <img src={ArrowIcon} alt='arrow' />
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