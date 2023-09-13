// import { voteAnecdote } from '../reducers/anecdoteReducer'
import { voteAnecdote } from '../reducers/anecdoteSlice'
import { notifyChange } from '../reducers/notificationSlice'
import { useDispatch, useSelector } from 'react-redux'

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes)
  const dispatch = useDispatch()

  const vote = (id, content) => {
    dispatch(voteAnecdote(id))
    dispatch(notifyChange(`You voted '${content}'`, 10))
  }

  const sortedAnecdotes = anecdotes.slice().sort((a, b) => b.votes - a.votes)

  return (
    <div>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}...</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
