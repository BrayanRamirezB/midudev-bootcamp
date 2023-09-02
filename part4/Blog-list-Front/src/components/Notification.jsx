import PropTypes from 'prop-types'
import './Notification.css'

const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }
  return <div className={type}>{message}</div>
}

Notification.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string
}

export default Notification
