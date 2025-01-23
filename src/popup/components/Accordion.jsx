import React from 'react';

function Accordion({
  label = '',
  children = null
}) {
  return (
    <div>
      <div>
        <p>{label}</p>
      </div>
      {children !== null ? children : null}
    </div>
  );
}

export default Accordion;