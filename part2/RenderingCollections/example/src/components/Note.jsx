import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './Note.css'

const Note = ({ note, toggleImportance }) => {
  const label = note.important ? 'make not important' : 'make important'

  return (
    <li className='note'>
      <p>
        <Link to={`/notes/${note.id}`}>
          Content: <small>{note.content}</small> <br />
        </Link>
        Date: <small>{note.date}</small>
      </p>
      <button onClick={toggleImportance}>{label}</button>
    </li>
  )
}

Note.propTypes = {
  note: PropTypes.object,
  toggleImportance: PropTypes.func
}

export default Note
