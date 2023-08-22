import { useEffect, useState } from 'react'
import {
  createNote,
  updateImportance,
  getAllNotes
} from './services/notes/notes.js'
import Note from './components/Note'
import './App.css'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [loading, setLoading] = useState(false)

  //para hacerlo con axios
  useEffect(() => {
    setLoading(true)
    getAllNotes()
      .then((notes) => {
        setNotes(notes)
        setLoading(false)
      })
      .catch((error) => {
        alert(error)
      })
  }, [])

  //Para hacerlo con fetch
  // useEffect(() => {
  //   setLoading(true)
  //   //React renderiza lo que pueda antes, por eso debe esperar a hacer el fetch
  //   setTimeout(() => {
  //     fetch('https://jsonplaceholder.typicode.com/posts')
  //       .then((response) => response.json())
  //       .then((json) => {
  //         setNotes(json)
  //         setLoading(false)
  //       })
  //   }, 2000)
  // }, [newNote]) //Solo se ejecuta una vez por la dependencia [], ahora tiene una dependencia y se ejecuta cada vez que cambia

  const handleChange = (event) => {
    setNewNote(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const noteToAddState = {
      content: newNote,
      important: true
    }

    createNote(noteToAddState)
      .then((newNote) => {
        setNotes((prevNotes) => prevNotes.concat(newNote))
      })
      .catch((error) => {
        alert(error)
      })

    setNewNote('')
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id)
    const changedNote = { ...note, important: !note.important }

    updateImportance(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)))
      })
      .catch((error) => {
        alert(error)
      })
  }

  return (
    <>
      <div>
        <h1>Notes</h1>
        {loading ? 'Loading...' : ''}
        <ul>
          {notes.map((note) => (
            <Note
              key={note.id}
              note={note}
              toggleImportance={() => toggleImportanceOf(note.id)}
            />
          ))}
        </ul>
        <form onSubmit={handleSubmit}>
          <input type='text' value={newNote} onChange={handleChange} />
          <button type='submit'>Save</button>
        </form>
      </div>
    </>
  )
}

export default App
