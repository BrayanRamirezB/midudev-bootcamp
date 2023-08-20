import PropTypes from 'prop-types'

const Input = ({ content, value, change }) => {
  return (
    <p>
      {content}:<input type="text" value={value} onChange={change} />
    </p>
  )
}

Input.propTypes = {
  content: PropTypes.string,
  value: PropTypes.string,
  change: PropTypes.func,
}

export default Input
