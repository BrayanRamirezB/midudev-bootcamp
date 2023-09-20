import PropTypes from 'prop-types'
import { useState, useRef } from 'react'
import Togglable from './Togglable'

import { Button, TextField, Box } from '@mui/material'

const NotesForm = ({ addNote, handleClick }) => {
  const [newNote, setNewNote] = useState('')
  const togglableRef = useRef()

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
    togglableRef.current.toggleVisibility()
  }

  return (
    <>
      <Togglable buttonLabel='New Note' ref={togglableRef}>
        <h3>Create a new note</h3>
        <form onSubmit={handleSubmit}>
          <Box sx={{ width: 600, maxWidth: 800 }}>
            <TextField
              fullWidth
              size='small'
              type='text'
              value={newNote}
              placeholder='Write yor note content :)'
              onChange={handleChange}
            />
            <Button variant='contained' color='success' type='submit'>
              Save
            </Button>
          </Box>
        </form>
        <br />
        <Button variant='contained' color='error' onClick={handleClick}>
          Logout
        </Button>
      </Togglable>
    </>
  )
}

NotesForm.propTypes = {
  handleClick: PropTypes.func,
  addNote: PropTypes.func
}

export default NotesForm
