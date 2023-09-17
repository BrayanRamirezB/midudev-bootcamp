import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'

const AnecdoteDetail = ({ anecdotes }) => {
  const { anecdoteId } = useParams()
  const anecdote = anecdotes.find((a) => a.id === Number(anecdoteId))
  if (!anecdote) return null

  return (
    <div>
      <h2>
        {anecdote.content} by {anecdote.author}
      </h2>
      <p>has {anecdote.votes} votes</p>
      <p>for more info see {anecdote.info}</p>
    </div>
  )
}

AnecdoteDetail.propTypes = {
  anecdotes: PropTypes.array
}

export default AnecdoteDetail
