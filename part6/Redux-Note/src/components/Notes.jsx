import { useSelector, useDispatch } from 'react-redux'
import { toggleImportant } from '../features/note/noteReducer'

const Notes = () => {
  const notes = useSelector((state) => {
    if (state.filter === 'ALL') {
      return state.notes
    }
    return state.filter === 'IMPORTANT'
      ? state.notes.filter((note) => note.important)
      : state.notes.filter((note) => !note.important)
  })
  const dispatch = useDispatch()

  const toggleImportance = (id) => {
    // const note = notes.find((note) => note.id === id)
    // const updatedNote = {
    //   ...note,
    //   importat: !note.important
    // }
    // updateNote(id, updatedNote)
    dispatch(toggleImportant(id))
  }

  return (
    <ul>
      {notes.map((note) => {
        return (
          <li key={note.id} onClick={() => toggleImportance(note.id)}>
            {note.content} {note.important ? 'Important' : ''}
          </li>
        )
      })}
    </ul>
  )
}

export default Notes
