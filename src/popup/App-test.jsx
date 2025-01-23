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

import React, { useState } from 'react';

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
        placeholder1: 'Enter PX value',
        placeholder2: 'Converted to REM'
      };
    case 'REM_PX':
      return {
        label1: 'REM',
        label2: 'PX',
        placeholder1: 'Enter REM value',
        placeholder2: 'Converted to PX'
      };
    case 'PX_EM':
      return {
        label1: 'PX',
        label2: 'EM',
        placeholder1: 'Enter PX value',
        placeholder2: 'Converted to EM'
      };
    case 'EM_PX':
      return {
        label1: 'EM',
        label2: 'PX',
        placeholder1: 'Enter EM value',
        placeholder2: 'Converted to PX'
      };
    case 'PX_PCT':
      return {
        label1: 'PX',
        label2: '%',
        placeholder1: 'Enter PX value',
        placeholder2: 'Converted to %'
      };
    case 'PCT_PX':
      return {
        label1: '%',
        label2: 'PX',
        placeholder1: 'Enter % value',
        placeholder2: 'Converted to PX'
      };
    case 'BASE_PX':
      return {
        label1: 'Base Unit',
        label2: 'PX',
        placeholder1: 'Enter base unit value',
        placeholder2: 'Converted to PX'
      };
    case 'PX_BASE':
      return {
        label1: 'PX',
        label2: 'Base Unit',
        placeholder1: 'Enter PX value',
        placeholder2: 'Converted to base unit'
      };
    default:
      return {
        label1: 'Value 1',
        label2: 'Value 2',
        placeholder1: 'Enter value',
        placeholder2: 'Converted value'
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
    <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
      <h1>Multi-Unit Converter (Customizable Base Values)</h1>

      {/* -- Conversion type selection -- */}
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="conversionType" style={{ marginRight: '8px' }}>
          Select conversion:
        </label>
        <select
          id="conversionType"
          value={selectedConversion}
          onChange={handleSelectChange}
        >
          <option value="PX_REM">PX → REM</option>
          <option value="REM_PX">REM → PX</option>
          <option value="PX_EM">PX → EM</option>
          <option value="EM_PX">EM → PX</option>
          <option value="PX_PCT">PX → %</option>
          <option value="PCT_PX">% → PX</option>
          <option value="BASE_PX">Base unit → PX</option>
          <option value="PX_BASE">PX → Base unit</option>
        </select>
      </div>

      {/* -- Conversion fields -- */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '4px' }}>
            {label1}
          </label>
          <input
            type="number"
            value={value1}
            onChange={handleValue1Change}
            placeholder={placeholder1}
            style={{ width: '120px', marginRight: '1rem' }}
          />
        </div>

        <div className="switch__container">
          <button onClick={handleSwitch}>
            switch
          </button>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '4px' }}>
            {label2}
          </label>
          <input
            type="number"
            value={value2}
            onChange={handleValue2Change}
            placeholder={placeholder2}
            style={{ width: '120px' }}
          />
        </div>
      </div>

      {/* -- Custom base values section -- */}
      <div style={{ marginTop: '30px', border: '1px solid #ccc', padding: '16px' }}>
        <h2>Custom base values</h2>
        <p>You can change the base values used in the conversions below.</p>
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
      </div>

      {/* -- Display current base values in use -- */}
      <div style={{ marginTop: '20px', fontStyle: 'italic' }}>
        <p>Current base values in use:</p>
        <ul>
          <li>1rem = {baseRem}px</li>
          <li>1em = {baseEm}px</li>
          <li>containerWidth = {containerWidth}px (for PX ↔ %)</li>
          <li>baseUnit = {baseUnit} (for Base ↔ PX)</li>
        </ul>
      </div>
    </div>
  );
}
