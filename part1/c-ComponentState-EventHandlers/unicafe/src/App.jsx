import { useState } from 'react'
import './App.css'
import Statistics from './components/Statistics'
import CommentaryBtn from './components/CommentaryBtn'

const INIT_STATE = {
  good: 0,
  neutral: 0,
  bad: 0,
  total: 0,
}

function App() {
  const [commentary, setCommentary] = useState(INIT_STATE)

  const handlerClickGood = () => {
    setCommentary({
      ...commentary,
      good: commentary.good + 1,
      total: commentary.total + 1,
    })
  }

  const handlerClickNeutral = () => {
    setCommentary({
      ...commentary,
      neutral: commentary.neutral + 1,
      total: commentary.total + 1,
    })
  }

  const handlerClickBad = () => {
    setCommentary({
      ...commentary,
      bad: commentary.bad + 1,
      total: commentary.total + 1,
    })
  }

  const showStats =
    commentary.total === 0 ? (
      <h2>No feedback given</h2>
    ) : (
      <Statistics commentary={commentary} />
    )

  return (
    <>
      <div>
        <h1>Give feedback</h1>
        <CommentaryBtn text={'Good'} handler={handlerClickGood} />
        <CommentaryBtn text={'Neutral'} handler={handlerClickNeutral} />
        <CommentaryBtn text={'Bad'} handler={handlerClickBad} />

        <h1>Statistics</h1>
        {showStats}
      </div>
    </>
  )
}

export default App
