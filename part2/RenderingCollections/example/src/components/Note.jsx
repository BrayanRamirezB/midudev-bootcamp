import PropTypes from 'prop-types'

const Note = ({ note }) => {
  return <li>{note.title}</li>
}

Note.propTypes = {
  note: PropTypes.object,
}

export default Note
