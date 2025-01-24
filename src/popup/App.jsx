/**
 * @fileOverview
 * This file contains a single React component that performs multiple conversions between units:
 * - PX ↔ REM
 * - PX ↔ EM
 * - PX ↔ %
 * - Base Unit ↔ PX
 *
 * It also allows the user to customize the base values used for these conversions:
 * - 1rem in px (default: 16)
 * - 1em in px (default: 16)
 * - containerWidth in px (default: 1024)
 * - baseUnit (default: 8)
 *
 * The user can select a specific conversion mode from a dropdown,
 * input values into two fields, and switch the direction of the conversion if applicable.
 */

import { useState } from 'react';
import Select from './components/Select';
import Input from './components/Input';
import Switch from './components/Switch';
import Accordion from './components/Accordion';
import messages from './modules/messages';

/**
 * Converts PX to REM, given a custom baseRem value.
 * @param {number} px - The value in PX to be converted.
 * @param {number} baseRem - The number of px in 1rem.
 * @returns {number} The converted value in REM.
 */
function pxToRem(px, baseRem) {
  return px / baseRem;
}

/**
 * Converts REM to PX, given a custom baseRem value.
 * @param {number} rem - The value in REM to be converted.
 * @param {number} baseRem - The number of px in 1rem.
 * @returns {number} The converted value in PX.
 */
function remToPx(rem, baseRem) {
  return rem * baseRem;
}

/**
 * Converts PX to EM, given a custom baseEm value.
 * @param {number} px - The value in PX to be converted.
 * @param {number} baseEm - The number of px in 1em.
 * @returns {number} The converted value in EM.
 */
function pxToEm(px, baseEm) {
  return px / baseEm;
}

/**
 * Converts EM to PX, given a custom baseEm value.
 * @param {number} em - The value in EM to be converted.
 * @param {number} baseEm - The number of px in 1em.
 * @returns {number} The converted value in PX.
 */
function emToPx(em, baseEm) {
  return em * baseEm;
}

/**
 * Converts PX to percentage, given a container width in px.
 * @param {number} px - The value in PX to be converted.
 * @param {number} containerWidth - The container width in px for relative % calculation.
 * @returns {number} The converted value in % (0-100).
 */
function pxToPct(px, containerWidth) {
  return (px / containerWidth) * 100;
}

/**
 * Converts percentage to PX, given a container width in px.
 * @param {number} pct - The value in percentage to be converted.
 * @param {number} containerWidth - The container width in px for relative % calculation.
 * @returns {number} The converted value in PX.
 */
function pctToPx(pct, containerWidth) {
  return (pct / 100) * containerWidth;
}

/**
 * Converts a "base unit" to PX, given a baseUnit factor.
 * @param {number} base - The value in base units to be converted.
 * @param {number} baseUnit - The factor that 1 base unit represents in px.
 * @returns {number} The converted value in PX.
 */
function baseUnitToPx(base, baseUnit) {
  return base * baseUnit;
}

/**
 * Converts PX to "base unit", given a baseUnit factor.
 * @param {number} px - The value in PX to be converted.
 * @param {number} baseUnit - The factor that 1 base unit represents in px.
 * @returns {number} The converted value in base units.
 */
function pxToBaseUnit(px, baseUnit) {
  return px / baseUnit;
}

/**
 * Converts a value using the "forward" direction, based on the selected conversion.
 * @param {string} selectedConversion - The current mode of conversion (e.g., 'PX_REM', 'REM_PX', etc.).
 * @param {number} value - The number to convert.
 * @param {object} bases - An object containing all base values (baseRem, baseEm, containerWidth, baseUnit).
 * @returns {number} The converted result.
 */
function directConversion(selectedConversion, value, { baseRem, baseEm, containerWidth, baseUnit }) {
  switch (selectedConversion) {
    case 'PX_REM':
      return pxToRem(value, baseRem);
    case 'REM_PX':
      return remToPx(value, baseRem);
    case 'PX_EM':
      return pxToEm(value, baseEm);
    case 'EM_PX':
      return emToPx(value, baseEm);
    case 'PX_PCT':
      return pxToPct(value, containerWidth);
    case 'PCT_PX':
      return pctToPx(value, containerWidth);
    case 'BASE_PX':
      return baseUnitToPx(value, baseUnit);
    case 'PX_BASE':
      return pxToBaseUnit(value, baseUnit);
    default:
      return 0;
  }
}

/**
 * Converts a value using the "reverse" direction, based on the selected conversion.
 * @param {string} selectedConversion - The current mode of conversion (e.g., 'PX_REM', 'REM_PX', etc.).
 * @param {number} value - The number to convert.
 * @param {object} bases - An object containing all base values (baseRem, baseEm, containerWidth, baseUnit).
 * @returns {number} The converted result in the opposite direction.
 */
function reverseConversion(selectedConversion, value, { baseRem, baseEm, containerWidth, baseUnit }) {
  switch (selectedConversion) {
    case 'PX_REM':
      // reverse = REM -> PX
      return remToPx(value, baseRem);
    case 'REM_PX':
      // reverse = PX -> REM
      return pxToRem(value, baseRem);
    case 'PX_EM':
      // reverse = EM -> PX
      return emToPx(value, baseEm);
    case 'EM_PX':
      // reverse = PX -> EM
      return pxToEm(value, baseEm);
    case 'PX_PCT':
      // reverse = % -> PX
      return pctToPx(value, containerWidth);
    case 'PCT_PX':
      // reverse = PX -> %
      return pxToPct(value, containerWidth);
    case 'BASE_PX':
      // reverse = PX -> base unit
      return pxToBaseUnit(value, baseUnit);
    case 'PX_BASE':
      // reverse = base unit -> PX
      return baseUnitToPx(value, baseUnit);
    default:
      return 0;
  }
}

/**
 * Returns dynamic labels and placeholders for the two input fields, based on the selected conversion.
 * @param {string} selectedConversion - The current mode of conversion (e.g., 'PX_REM', 'REM_PX', etc.).
 * @returns {{label1: string, label2: string, placeholder1: string, placeholder2: string}}
 */
function getLabelsAndPlaceholders(selectedConversion) {
  switch (selectedConversion) {
    case 'PX_REM':
      return {
        label1: 'PX',
        label2: 'REM',
        placeholder1: 'PX',
        placeholder2: 'REM'
      };
    case 'REM_PX':
      return {
        label1: 'REM',
        label2: 'PX',
        placeholder1: 'REM',
        placeholder2: 'PX'
      };
    case 'PX_EM':
      return {
        label1: 'PX',
        label2: 'EM',
        placeholder1: 'PX',
        placeholder2: 'EM'
      };
    case 'EM_PX':
      return {
        label1: 'EM',
        label2: 'PX',
        placeholder1: 'EM',
        placeholder2: 'PX'
      };
    case 'PX_PCT':
      return {
        label1: 'PX',
        label2: '%',
        placeholder1: 'PX',
        placeholder2: '%'
      };
    case 'PCT_PX':
      return {
        label1: '%',
        label2: 'PX',
        placeholder1: '%',
        placeholder2: 'PX'
      };
    case 'BASE_PX':
      return {
        label1: 'Base Unit',
        label2: 'PX',
        placeholder1: 'base unit',
        placeholder2: 'PX'
      };
    case 'PX_BASE':
      return {
        label1: 'PX',
        label2: 'Base Unit',
        placeholder1: 'PX',
        placeholder2: 'base unit'
      };
    default:
      return {
        label1: 'Value 1',
        label2: 'Value 2',
        placeholder1: 'value',
        placeholder2: 'value'
      };
  }
}

/**
 * Main React component that handles multiple unit conversions and
 * allows customization of the base values (1rem, 1em, container width, base unit).
 *
 * @component
 * @returns {JSX.Element} The rendered component.
 */
export default function App() {
  // Conversion mode
  const [selectedConversion, setSelectedConversion] = useState('PX_REM');

  // Values for the two conversion inputs
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');

  // Customizable base values
  const [baseRem, setBaseRem] = useState(16);          // default 1rem = 16px
  const [baseEm, setBaseEm] = useState(16);            // default 1em = 16px
  const [containerWidth, setContainerWidth] = useState(1024); // default container = 1024px
  const [baseUnit, setBaseUnit] = useState(8);         // default base unit = 8px

  // Retrieve dynamic labels/placeholders based on the conversion type
  const { label1, label2, placeholder1, placeholder2 } = getLabelsAndPlaceholders(selectedConversion);

  // Select options
  const selectOptions = [
    { value: 'PX_REM', label: 'PX → REM' },
    { value: 'REM_PX', label: 'REM → PX' },
    { value: 'PX_EM', label: 'PX → EM' },
    { value: 'EM_PX', label: 'EM → PX' },
    { value: 'PX_PCT', label: 'PX → %' },
    { value: 'PCT_PX', label: '% → PX' },
    { value: 'BASE_PX', label: 'Base unit → PX' },
    { value: 'PX_BASE', label: 'PX → Base unit' }
  ]

  /**
   * Handle changes in the <select> element for conversion type.
   * Reset the input fields and set the new conversion mode.
   * @param {React.ChangeEvent<HTMLSelectElement>} e
   */
  function handleSelectChange(e) {
    const newConversion = e.target.value;
    setSelectedConversion(newConversion);
    setValue1('');
    setValue2('');
  }

  /**
   * Handle changes in the first input field. Performs the direct conversion.
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  function handleValue1Change(e) {
    const newVal = e.target.value;
    setValue1(newVal);

    const parsedVal = parseFloat(newVal);
    if (!isNaN(parsedVal)) {
      const converted = directConversion(selectedConversion, parsedVal, {
        baseRem,
        baseEm,
        containerWidth,
        baseUnit
      });
      // Round to a maximum of 3 decimals
      setValue2(converted.toFixed(3));
    } else {
      setValue2('');
    }
  }

  /**
   * Handle changes in the second input field. Performs the reverse conversion.
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  function handleValue2Change(e) {
    const newVal = e.target.value;
    setValue2(newVal);

    const parsedVal = parseFloat(newVal);
    if (!isNaN(parsedVal)) {
      const converted = reverseConversion(selectedConversion, parsedVal, {
        baseRem,
        baseEm,
        containerWidth,
        baseUnit
      });
      // Round to a maximum of 3 decimals
      setValue1(converted.toFixed(3));
    } else {
      setValue1('');
    }
  }

  /**
   * Handle the "switch" button click. Inverts the current conversion type:
   * e.g. PX_REM ↔ REM_PX, PX_EM ↔ EM_PX, etc.
   * Also swaps the input values for consistency.
   */
  function handleSwitch() {
    const invertedMap = {
      'PX_REM': 'REM_PX',
      'REM_PX': 'PX_REM',
      'PX_EM': 'EM_PX',
      'EM_PX': 'PX_EM',
      'PX_PCT': 'PCT_PX',
      'PCT_PX': 'PX_PCT',
      'BASE_PX': 'PX_BASE',
      'PX_BASE': 'BASE_PX'
    };

    const newConversion = invertedMap[selectedConversion] || selectedConversion;
    setSelectedConversion(newConversion);

    // We'll simply swap the two values
    const tmpValue1 = value1;
    setValue1(value2);
    setValue2(tmpValue1);
  }

  return (
    <div className='wrapper'>
      <h2 className='app__title'>
        {messages.title}
      </h2>
      <p className='app__subtitle'>
        {messages.subtitle}
      </p>

      {/* -- Conversion type selection -- */}
      <div className='app__select'>
        <Select
          id='conversionType'
          value={selectedConversion}
          onChange={handleSelectChange}
          options={selectOptions}
        />
      </div>

      {/* -- Conversion fields -- */}
      <div className='app__fileds'>
        <Input
          id='input1'
          label={label1}
          value={value1}
          onChange={handleValue1Change}
          placeholder={placeholder1}
        />
        <Switch onClick={handleSwitch} />
        <Input
          convertion
          id='input2'
          label={label2}
          value={value2}
          onChange={handleValue2Change}
          placeholder={placeholder2}
        />
      </div>

      {/* -- Display current base values in use -- */}
      <div className='app__base-values'>
        <h3>Current base values in use:</h3>
        <p>1rem = {baseRem}px</p>
        <p>1em = {baseEm}px</p>
        <p>containerWidth = {containerWidth}px (for PX ↔ %)</p>
        <p>baseUnit = {baseUnit} (for Base ↔ PX)</p>
      </div>

      {/* -- Custom base values section -- */}
      <Accordion
        label='Custom base values'
        caption='You can change the base values used in the conversions below.'
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}>
          <label>
            <strong>1rem in px: </strong>
            <input
              type="number"
              value={baseRem}
              onChange={(e) => setBaseRem(parseFloat(e.target.value) || 0)}
              style={{ width: '100px', marginLeft: '8px' }}
            />
          </label>

          <label>
            <strong>1em in px: </strong>
            <input
              type="number"
              value={baseEm}
              onChange={(e) => setBaseEm(parseFloat(e.target.value) || 0)}
              style={{ width: '100px', marginLeft: '8px' }}
            />
          </label>

          <label>
            <strong>Container width in px: </strong>
            <input
              type="number"
              value={containerWidth}
              onChange={(e) => setContainerWidth(parseFloat(e.target.value) || 0)}
              style={{ width: '100px', marginLeft: '8px' }}
            />
          </label>

          <label>
            <strong>Base unit: </strong>
            <input
              type="number"
              value={baseUnit}
              onChange={(e) => setBaseUnit(parseFloat(e.target.value) || 0)}
              style={{ width: '100px', marginLeft: '8px' }}
            />
          </label>
        </div>
      </Accordion>
    </div>
  );
}
