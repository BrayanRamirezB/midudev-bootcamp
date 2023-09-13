import { useDispatch } from 'react-redux'
import { addNote } from '../features/note/noteReducer'

const NoteForm = () => {
  const dispatch = useDispatch()

  const addNotes = async (event) => {
    event.preventDefault()
    const { target } = event
    const content = target.note.value
    target.note.value = ''

    dispatch(addNote(content))
  }

  return (
    <form onSubmit={addNotes}>
      <input type='text' name='note' />
      <button type='submit'>Add note</button>
    </form>
  )
}

export default NoteForm
