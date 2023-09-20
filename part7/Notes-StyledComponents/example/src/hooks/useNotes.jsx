import { useState, useEffect } from 'react'
import { getAllNotes, createNote, updateImportance } from '../services/notes'

export const useNotes = () => {
  const [notes, setNotes] = useState([])

  //para hacerlo con axios
  useEffect(() => {
    getAllNotes()
      .then((notes) => {
        setNotes(notes)
      })
      .catch((error) => {
        alert(error)
      })
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

  const toggleImportance = (id) => {
    const note = notes.find((n) => n.id === id)
    const changedNote = { important: !note.important }

    return updateImportance(id, changedNote).then((returnedNote) => {
      setNotes((prevNotes) =>
        prevNotes.map((note) => (note.id !== id ? note : returnedNote))
      )
    })
  }

  return {
    notes,
    setNotes,
    addNote,
    toggleImportance
  }
}
