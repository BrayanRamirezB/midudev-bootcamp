import PropTypes from 'prop-types'

const Mensaje = (props) => {
  return <h1 style={{ color: props.color }}>{props.message}</h1>
}

Mensaje.propTypes = {
  message: PropTypes.string,
  color: PropTypes.string,
}

export default Mensaje
