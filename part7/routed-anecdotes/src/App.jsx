import Menu from './components/Menu'
import AnecdoteList from './components/AnecdoteList'
import About from './components/About'
import Footer from './components/Footer'
import CreateNew from './components/CreateNew'
import AnecdoteDetail from './components/AnecdoteDetail'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import './App.css'

const inititalAnecdotes = [
  {
    content: 'If it hurts, do it more often',
    author: 'Jez Humble',
    info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
    votes: 0,
    id: 1
  },
  {
    content: 'Premature optimization is the root of all evil',
    author: 'Donald Knuth',
    info: 'http://wiki.c2.com/?PrematureOptimization',
    votes: 0,
    id: 2
  }
]

const App = () => {
  const [anecdotes, setAnecdotes] = useState(inititalAnecdotes)
  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))

    setNotification(`A new anecdote ${anecdote.content} created!!`)

    setTimeout(() => {
      setNotification(null)
    }, 10000)
  }

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <BrowserRouter>
        <header>
          <Menu />
        </header>

        {notification}

        <Routes>
          <Route
            path='/'
            element={<AnecdoteList anecdotes={anecdotes} handleVote={vote} />}
          />
          <Route path='/create' element={<CreateNew addNew={addNew} />} />
          <Route path='/about' element={<About />} />
          <Route
            path='/:anecdoteId'
            element={<AnecdoteDetail anecdotes={anecdotes} />}
          />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  )
}

export default App
