import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Button from 'react-bootstrap/Button'

const Note = ({ note, toggleImportance }) => {
  const label = note.important ? 'make not important' : 'make important'

  return (
    <>
      <td className='note'>
        <p>
          <Link to={`/notes/${note.id}`}>
            Content: <small>{note.content}</small> <br />
          </Link>
          Date: <small>{note.date}</small>
        </p>
      </td>
      <td>
        <Button onClick={toggleImportance}>{label}</Button>
      </td>
    </>
  )
}

Note.propTypes = {
  note: PropTypes.object,
  toggleImportance: PropTypes.func
}

export default Note
