import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment, reset } from './features/counter/counterSlice'
import './App.css'

function App() {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div>
      <div>{count}</div>
      <div>
        <button onClick={() => dispatch(increment())}>plus</button>
        <button onClick={() => dispatch(decrement())}>minus</button>
        <button onClick={() => dispatch(reset())}>reset</button>
      </div>
    </div>
  )
}

export default App
