import PropTypes from 'prop-types'

const Note = ({ title, body }) => {
  return (
    <li>
      <p>{title}</p>
      <small>{body}</small>
    </li>
  )
}

Note.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
}

export default Note
