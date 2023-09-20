import { useState } from 'react'
import Notification from './components/Notification.jsx'
import Note from './components/Note'
import NoteForm from './components/NoteForm.jsx'
import PropTypes from 'prop-types'
import Login from './Login.jsx'
import { useUser } from './hooks/useUser.jsx'
import { useNotes } from './hooks/useNotes.jsx'

import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'

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

        <TableContainer>
          <Table>
            <TableBody>
              {notes.map((note, i) => (
                <TableRow key={i}>
                  <Note
                    note={note}
                    toggleImportance={() => toggleImportanceOf(note.id)}
                  />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  )
}

Notes.propTypes = {
  onLogout: PropTypes.func,
  onLogin: PropTypes.func
}

export default Notes
