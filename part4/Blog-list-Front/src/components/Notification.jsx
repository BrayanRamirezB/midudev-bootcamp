import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import Alert from 'react-bootstrap/Alert'

const Notification = () => {
  const notification = useSelector((state) => state.notifications)

  const talert =
    notification.typeOfM === 'error' ? (
      <Alert key='danger' variant='danger'>
        {notification.message}
      </Alert>
    ) : (
      <Alert key='success' variant='success'>
        {notification.message}
      </Alert>
    )

  return notification.message ? talert : null
}

Notification.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string
}

export default Notification
