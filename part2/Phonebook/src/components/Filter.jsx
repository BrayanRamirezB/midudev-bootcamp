import PropTypes from 'prop-types'

const Filter = (props) => {
  return (
    <p>
      filter shown with:
      <input type="text" value={props.value} onChange={props.onChange} />
    </p>
  )
}

Filter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
}

export default Filter
