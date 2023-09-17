import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'

const NoteDetail = ({ notes }) => {
  const { noteId } = useParams()
  const note = notes.find((note) => note.id === noteId)
  if (!note) return null

  return (
    <div>
      <h2>{note.content}</h2>
      <div>{note?.user?.name}</div>
      <div>
        <strong>{note.important ? 'important' : ''}</strong>
      </div>
    </div>
  )
}

NoteDetail.propTypes = {
  notes: PropTypes.array
}

export default NoteDetail
