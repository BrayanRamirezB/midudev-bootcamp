import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const AnecdoteList = ({ anecdotes, handleVote }) => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map((anecdote) => (
          <li key={anecdote.id}>
            <Link to={`/${anecdote.id}`}>{anecdote.content}</Link>
            <button onClick={() => handleVote(anecdote.id)}>Vote</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

AnecdoteList.propTypes = {
  anecdotes: PropTypes.array,
  handleVote: PropTypes.func
}

export default AnecdoteList
