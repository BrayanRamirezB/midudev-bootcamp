import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { anecdotesAtStart } from './reducers/anecdoteSlice'
import './App.css'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(anecdotesAtStart())
  }, [dispatch])

  return (
    <div>
      <h1>Anecdotes</h1>
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
