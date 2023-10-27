import PropTypes from 'prop-types'

const NotifyError = ({ message }) => {
  if (!message) return null

  return (
    <div>
      <h3>{message}</h3>
    </div>
  )
}

NotifyError.propTypes = {
  message: PropTypes.string
}

export default NotifyError
