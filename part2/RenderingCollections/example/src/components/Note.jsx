import PropTypes from 'prop-types'

const Note = (props) => {
  return (
    <li>
      <h3>Nota: {props.id}</h3>
      <p>
        Content: <small>{props.content}</small>
      </p>
      <p>
        Date: <small>{props.date}</small>
      </p>
    </li>
  )
}

Note.propTypes = {
  id: PropTypes.number,
  content: PropTypes.string,
  date: PropTypes.string,
  important: PropTypes.bool
}

export default Note
