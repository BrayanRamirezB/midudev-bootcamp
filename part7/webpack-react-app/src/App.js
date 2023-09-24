import { useState } from 'react'

const App = () => {
  const [counter, setCounter] = useState(0)
  const [values, setValues] = useState()

  const handleChange = (event) => {
    setCounter(event)
    setValues(values.concat(counter))
  }

  return (
    <div className='container'>
      <h1>{counter}</h1>
      <button onClick={() => handleChange(counter + 1)}>+</button>
      <button onClick={() => handleChange(counter - 1)}>-</button>

      <h2>History</h2>
      <ul>
        {values.map((val, i) => {
          return <li key={i}>{val}</li>
        })}
      </ul>
    </div>
  )
}

export default App
