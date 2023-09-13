import { createSlice } from '@reduxjs/toolkit'

const noteSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers: {
    addNote: (state, action) => {
      return state.concat(action.payload)
    },
    toggleImportant: (state, action) => {
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
  }
})

export const { addNote, toggleImportant } = noteSlice.actions

export default noteSlice.reducer
