import Notification from './components/Notification.jsx'
import Note from './components/Note'
import NoteForm from './components/NoteForm.jsx'
import PropTypes from 'prop-types'
import Login from './Login.jsx'
import { useState } from 'react'
import { useUser } from './hooks/useUser.jsx'
import { useNotes } from './hooks/useNotes.jsx'

import Table from 'react-bootstrap/Table'

const Notes = ({ onLogin, onLogout }) => {
  const [error, setError] = useState(null)
  const { notes, addNote, toggleImportance } = useNotes()
  const { user, logout } = useUser()

  const handleUser = async (user) => {
    if (!user) {
      setError('Wrong credentials')
      setTimeout(() => {
        setError(null)
      }, 5000)
    } else {
      onLogin(user)
    }
  }

  const handleLogout = () => {
    logout()
    onLogout(null)
  }

  const toggleImportanceOf = (id) => {
    toggleImportance(id).catch(() => {
      setError('Something went wrong')
      setTimeout(() => {
        setError(null)
      }, 5000)
    })
  }

  return (
    <>
      <div>
        <h1>Notes</h1>
        <Notification message={error} />
        {user ? (
          <NoteForm addNote={addNote} handleClick={handleLogout} />
        ) : (
          <Login onLogin={handleUser} />
        )}
        <Table striped>
          <tbody>
            {notes.map((note, i) => (
              <tr key={i}>
                <Note
                  note={note}
                  toggleImportance={() => toggleImportanceOf(note.id)}
                />
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  )
}

Notes.propTypes = {
  onLogout: PropTypes.func,
  onLogin: PropTypes.func
}

export default Notes
