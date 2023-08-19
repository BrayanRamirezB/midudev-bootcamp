import { useState } from 'react'
import './StateComplex.css'
import WarningNotUse from './WarningNotUse'
import ListOfClicks from './ListOfClicks'

const StateComplex = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)

  const [counter, setCounters] = useState({
    left: 0,
    right: 0,
    mensaje: 'Soy un mensaje :)',
  })

  const [clicks, setClicks] = useState([])

  const handleClickLeft = () => {
    setCounters({
      ...counter, //Guarda las propiedades anteriores del objeto que no se cambian
      left: counter.left + 1,
    })
    setClicks((prevClicks) => {
      return prevClicks.concat('L')
    })
  }

  const handleClickRight = () => {
    setCounters({
      ...counter,
      right: counter.right + 1,
    })
    setClicks((prevClicks) => {
      return prevClicks.concat('R')
    })
  }

  return (
    <div>
      <span>{left}</span>
      <button onClick={() => setLeft(left + 1)}>left</button>
      <button onClick={() => setRight(right + 1)}>right</button>
      <span>{right}</span>
      <br />
      <br />
      <p>Using only one state</p>
      <span>{counter.left}</span>
      <button onClick={handleClickLeft}>left</button>
      <button onClick={handleClickRight}>right</button>
      <span>{counter.right}</span>
      <p>Clicks totales: {clicks.length}</p>
      <p>{counter.mensaje}</p>
      {clicks.length === 0 ? (
        <WarningNotUse />
      ) : (
        <ListOfClicks clicks={clicks} />
      )}
    </div>
  )
}

export default StateComplex
