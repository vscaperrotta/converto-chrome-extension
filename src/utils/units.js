// Select options
export const selectOptions = [
  { value: 'PX_REM', label: 'PX to REM' },
  { value: 'REM_PX', label: 'REM to PX' },
  { value: 'PX_EM', label: 'PX to EM' },
  { value: 'EM_PX', label: 'EM to PX' },
  { value: 'PX_PCT', label: 'PX to %' },
  { value: 'PCT_PX', label: '% to PX' },
  { value: 'BASE_PX', label: 'Base unit to PX' },
  { value: 'PX_BASE', label: 'PX to Base unit' }
]

export const invertedMap = {
  'PX_REM': 'REM_PX',
  'REM_PX': 'PX_REM',
  'PX_EM': 'EM_PX',
  'EM_PX': 'PX_EM',
  'PX_PCT': 'PCT_PX',
  'PCT_PX': 'PX_PCT',
  'BASE_PX': 'PX_BASE',
  'PX_BASE': 'BASE_PX'
};