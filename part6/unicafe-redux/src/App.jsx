import { useDispatch, useSelector } from 'react-redux'
import { addGood, addOk, addBad, setInit } from './features/counterReducer'
import './App.css'

function App() {
  const count = useSelector((state) => state.counter)
  const dispatch = useDispatch()

  return (
    <>
      <div>
        <button onClick={() => dispatch(addGood())}>good</button>
        <button onClick={() => dispatch(addOk())}>ok</button>
        <button onClick={() => dispatch(addBad())}>bad</button>
        <button onClick={() => dispatch(setInit())}>reset stats</button>
        <div>good {count.good}</div>
        <div>ok {count.ok}</div>
        <div>bad {count.bad}</div>
      </div>
    </>
  )
}

export default App
