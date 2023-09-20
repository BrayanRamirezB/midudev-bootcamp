import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import './Notification.css'

const Notification = () => {
  const notification = useSelector((state) => state.notifications)

  return notification ? (
    <div className={notification.typeOfM}>{notification.message}</div>
  ) : null
}

Notification.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string
}

export default Notification
