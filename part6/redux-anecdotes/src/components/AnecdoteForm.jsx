// import { createAnecdote } from '../reducers/anecdoteReducer'
import { createAnecdote } from '../reducers/anecdoteSlice'
import { notifyChange } from '../reducers/notificationSlice'
import { useDispatch } from 'react-redux'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const { target } = event
    const anecdote = target.anecdote.value
    target.anecdote.value = ''

    dispatch(createAnecdote(anecdote))
    dispatch(notifyChange(`You created '${anecdote}'`, 10))
  }

  return (
    <div>
      <h2>Create new anecdote</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input type='text' name='anecdote' />
        </div>
        <button type='submit'>Create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
