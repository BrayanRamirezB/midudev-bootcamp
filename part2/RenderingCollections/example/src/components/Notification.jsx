import PropTypes from 'prop-types'
import './Notification.css'

const Notification = ({ message }) => {
  if (message === null) return null
  return <div className='error'>{message}</div>
}

Notification.propTypes = {
  message: PropTypes.string
}

export default Notification
