import { useCallback, useState } from 'react'
// Usage
// function App() {
//   // Call the hook which returns, current value and the toggler function
//   const [isTextChanged, setIsTextChanged] = useToggle()
//   return <button onClick={setIsTextChanged}>{isTextChanged ? 'Toggled' : 'Click to Toggle'}</button>
// }
// Hook
// Parameter is the boolean, with default "false" value
export const useToggle = (initialState = false): [boolean, any] => {
  // Initialize the state
  const [state, setState] = useState<boolean>(initialState)
  // Define and memorize toggler function in case we pass down the comopnent,
  // This function change the boolean value to it's opposite value
  const toggle = useCallback((directState: any): void => {
    return setState((_state) => (typeof directState === 'boolean' ? directState : !_state))
  }, [])
  return [state, toggle]
}
