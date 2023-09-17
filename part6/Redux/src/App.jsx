import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment, reset } from './features/counter/counterSlice'
import './App.css'

const useCounter = () => {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  const increase = () => dispatch(increment())
  const reduce = () => dispatch(decrement())
  const zero = () => dispatch(reset())

  return {
    count,
    increase,
    reduce,
    zero
  }
}

function App() {
  const counterA = useCounter()
  const counterB = useCounter()

  return (
    <div>
      <div>
        <div>Counter A: {counterA.count}</div>
        <button onClick={counterA.increase}>plus</button>
        <button onClick={counterA.reduce}>minus</button>
        <button onClick={counterA.zero}>reset</button>
      </div>

      <div>
        <div>Counter B: {counterB.count}</div>
        <button onClick={counterB.increase}>plus</button>
        <button onClick={counterB.reduce}>minus</button>
        <button onClick={counterB.zero}>reset</button>
      </div>
    </div>
  )
}

export default App
