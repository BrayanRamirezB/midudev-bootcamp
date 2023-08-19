import { useState } from 'react'
import PropTypes from 'prop-types'
import './App.css'

const INIT_STATE = 0
const INIT_STATE_POINTS = new Uint8Array(6)

const App = (props) => {
  const [selected, setSelected] = useState(INIT_STATE)
  const [points, setPoints] = useState(INIT_STATE_POINTS)

  const handleClick = () => {
    setSelected(Math.floor(Math.random() * 6))
  }

  const handleClickVote = () => {
    const updatedPoints = [...points]
    updatedPoints[selected] += 1
    setPoints(updatedPoints)
  }

  const indexMostVotes = points.indexOf(Math.max(...points))
  const showMostVotes = indexMostVotes
    ? props.anecdotes[indexMostVotes]
    : 'No anecdote has votes'

  return (
    <>
      <div>
        <h1>Anecdote of the day</h1>
        <p>{props.anecdotes[selected]}</p>
        <p>Has {points[selected]} votes</p>
        <button onClick={handleClickVote}>Vote</button>
        <button onClick={handleClick}>Next anecdote</button>

        <h1>Anecdote wit most votes</h1>
        <p>{showMostVotes}</p>
      </div>
    </>
  )
}

App.propTypes = {
  anecdotes: PropTypes.array,
}

export default App
