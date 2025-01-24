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
import {
  directConversion,
  reverseConversion,
  getLabelsAndPlaceholders
} from '@utils/converters';
import Select from './components/Select';
import Input from './components/Input';
import Switch from './components/Switch';
import BaseUnits from './components/BaseUnits';
import Accordion from './components/Accordion';
import messages from './modules/messages';

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
  const [baseRem, setBaseRem] = useState(16);                 // default 1rem = 16px
  const [baseEm, setBaseEm] = useState(16);                   // default 1em = 16px
  const [containerWidth, setContainerWidth] = useState(1024); // default container = 1024px
  const [baseUnit, setBaseUnit] = useState(8);                // default base unit = 8px

  // Retrieve dynamic labels/placeholders based on the conversion type
  const { placeholder1, placeholder2 } = getLabelsAndPlaceholders(selectedConversion);

  // Select options
  const selectOptions = [
    { value: 'PX_REM', label: 'PX to REM' },
    { value: 'REM_PX', label: 'REM to PX' },
    { value: 'PX_EM', label: 'PX to EM' },
    { value: 'EM_PX', label: 'EM to PX' },
    { value: 'PX_PCT', label: 'PX to %' },
    { value: 'PCT_PX', label: '% to PX' },
    { value: 'BASE_PX', label: 'Base unit to PX' },
    { value: 'PX_BASE', label: 'PX to Base unit' }
  ]

  /**
   * Handle changes in the <select> element for conversion type.
   * Reset the input fields and set the new conversion mode.
   * @param {React.ChangeEvent<HTMLSelectElement>} e
   */
  function handleSelectChange(e) {
    const newConversion = e.value;
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
          value={value1}
          onChange={handleValue1Change}
          placeholder={placeholder1}
        />
        <Switch
          onClick={handleSwitch}
        />
        <Input
          convertion
          id='input2'
          value={value2}
          onChange={handleValue2Change}
          placeholder={placeholder2}
        />
      </div>

      <hr />

      {/* -- Display current base values in use -- */}
      <div className='app__base-values'>
        <BaseUnits
          baseRem={baseRem}
          baseEm={baseRem}
          containerWidth={baseRem}
          baseUnit={baseRem}
        />
      </div>

      <hr />

      {/* -- Custom base values section -- */}
      <Accordion
        label={messages.customizationTitle}
        caption={messages.customizationCaption}
      >
        <Input
          id='baseRem'
          label={'1rem in px'}
          value={baseRem}
          onChange={(e) => setBaseRem(parseFloat(e.target.value) || 0)}
          placeholder={'16'}
        />
        <Input
          id='baseRem'
          label={'1em in px'}
          value={baseEm}
          onChange={(e) => setBaseEm(parseFloat(e.target.value) || 0)}
          placeholder={'16'}
        />
        <Input
          id='baseRem'
          label={'Container width in px'}
          value={containerWidth}
          onChange={(e) => setContainerWidth(parseFloat(e.target.value) || 0)}
          placeholder={'16'}
        />
        <Input
          id='baseRem'
          label={'Base unit'}
          value={baseUnit}
          onChange={(e) => setBaseUnit(parseFloat(e.target.value) || 0)}
          placeholder={'16'}
        />
      </Accordion>
    </div>
  );
}
