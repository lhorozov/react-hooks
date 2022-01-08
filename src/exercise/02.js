// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

export const useLocalStorageState = (key, initialValue) => {
  const [value, setValue] = React.useState(
    () => window.localStorage.getItem(key) ?? initialValue,
  )

  React.useEffect(() => {
    window.localStorage.setItem(key, value)
  }, [key, value])

  return [value, setValue]
}

function Greeting({initialName = ''}) {
  const [value, setValue] = useLocalStorageState('name', initialName)

  function handleChange(event) {
    setValue(event.target.value)
  }
  return (
    <div>
      <form>
        <label value={value} htmlFor="name">
          Name:{' '}
        </label>
        <input value={value} onChange={handleChange} id="name" />
      </form>
      {value ? <strong>Hello {value}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting initialName="Lyuben" />
}

export default App
