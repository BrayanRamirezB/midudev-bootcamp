import PropTypes from 'prop-types'
import { useState } from 'react'
import Togglable from './Togglable'

const NotesForm = ({ addNote, handleClick }) => {
  const [newNote, setNewNote] = useState('')

  const handleChange = (event) => {
    setNewNote(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const noteToAddState = {
      content: newNote,
      important: false
    }

    addNote(noteToAddState)
    setNewNote('')
  }

  return (
    <>
      <Togglable buttonLabel='New Note'>
        <h3>Create a new note</h3>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            value={newNote}
            placeholder='Write yor note content :)'
            onChange={handleChange}
          />
          <button type='submit'>Save</button>
        </form>
        <button onClick={handleClick}>Logout</button>
      </Togglable>
    </>
  )
}

NotesForm.propTypes = {
  handleClick: PropTypes.func,
  addNote: PropTypes.func
}

export default NotesForm
