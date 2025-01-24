function BaseUnits({
  baseRem = '0',
  baseEm = '0',
  containerWidth = '0',
  baseUnit = '0',
}) {
  return (
    <div className='base-units__container'>
      <h4 className='base-units__title'>
        {'Current base values in use:'}
      </h4>
      <p className='base-units__label'>
        1rem = <span>{baseRem}px</span>
      </p>
      <p className='base-units__label'>
        1em = <span>{baseEm}px</span>
      </p>
      <p className='base-units__label'>
        containerWidth = <span>{containerWidth}px</span> (for PX ↔ %)
      </p>
      <p className='base-units__label'>
        baseUnit = <span>{baseUnit}</span> (for Base ↔ PX)
      </p>
    </div>
  );
}

export default BaseUnits;