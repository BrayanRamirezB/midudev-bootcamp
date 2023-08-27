import { useEffect, useState } from 'react'
import {
  createNote,
  updateImportance,
  getAllNotes,
  setToken
} from './services/notes.js'
import Notification from './components/Notification.jsx'
import Note from './components/Note'
import LoginForm from './components/LoginForm.jsx'
import NoteForm from './components/NoteForm.jsx'
import './App.css'

const App = () => {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [user, setUser] = useState(null)

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

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      setToken(user.token)
    }
  }, [])

  const addNote = (noteToAddState) => {
    createNote(noteToAddState)
      .then((newNote) => {
        setNotes((prevNotes) => prevNotes.concat(newNote))
      })
      .catch((error) => {
        alert(error)
      })
  }

  const handleLogout = () => {
    setUser(null)
    setToken(user.token)
    window.localStorage.removeItem('loggedNoteAppUser')
  }

  const handleUser = async (user) => {
    if (user) {
      setToken(user.token)
      setUser(user)
    } else {
      setError('Wrong credentials')
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id)
    const changedNote = { ...note, important: !note.important }

    updateImportance(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)))
      })
      .catch(() => {
        setError(`Note '${note.content}' was already removed from server`)
        setTimeout(() => {
          setError(null)
        }, 5000)
        setNotes(notes.filter((n) => n.id !== id))
      })
  }

  return (
    <>
      <div>
        <h1>Notes</h1>
        {loading ? 'Loading...' : ''}
        <Notification message={error} />
        {user ? (
          <NoteForm addNote={addNote} handleClick={handleLogout} />
        ) : (
          <LoginForm handleUser={handleUser} />
        )}
        <ul>
          {notes.map((note) => (
            <Note
              key={note.id}
              note={note}
              toggleImportance={() => toggleImportanceOf(note.id)}
            />
          ))}
        </ul>
      </div>
    </>
  )
}

export default App

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
