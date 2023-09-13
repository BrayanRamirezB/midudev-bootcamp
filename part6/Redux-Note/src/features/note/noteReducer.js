import { getAll, createNew } from '../../services/notes'
import { updateNote } from '../../services/notes'

export const initNotes = () => {
  return async (dispatch) => {
    const notes = await getAll()

    dispatch({
      type: '@notes/init',
      payload: notes
    })
  }
}

export const addNote = (content) => {
  return async (dispatch) => {
    const newNote = await createNew(content)

    dispatch({
      type: '@notes/created',
      payload: newNote
    })
  }
}

export const toggleImportant = (id) => {
  return async (dispatch, getState) => {
    // const notes = await getAll()
    const notes = getState()
    // Find the note with the matching ID
    const noteToToggle = notes.notes.find((note) => note.id === id)

    // Check if a note with the given ID was found
    if (noteToToggle) {
      // Toggle the "important" property
      const updatedNote = {
        ...noteToToggle,
        important: !noteToToggle.important
      }

      try {
        // Update the note on the server
        await updateNote(id, updatedNote)

        // Dispatch the action with the updated note
        dispatch({
          type: '@notes/toggleImportant',
          payload: {
            id
          }
        })
      } catch (error) {
        // Handle any errors that occur during the update
        console.error('Error updating note:', error)
      }
    }
  }
  // return {
  //   type: '@notes/toggleImportant',
  //   payload: {
  //     id
  //   }
  // }
}

const notesReducer = (state = [], action) => {
  switch (action.type) {
    case '@notes/init': {
      return action.payload
    }

    case '@notes/created': {
      return state.concat(action.payload)
    }

    case '@notes/toggleImportant': {
      const { id } = action.payload
      return state.map((note) => {
        if (note.id === id) {
          return {
            ...note,
            important: !note.important
          }
        }
        return note
      })
    }

    default:
      return state
  }
}

export default notesReducer
