import PropTypes from 'prop-types'

const Note = ({ note, toggleImportance }) => {
  const label = note.important ? 'make not important' : 'make important'

  return (
    <li>
      <p>
        Content: <small>{note.content}</small> <br />
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
