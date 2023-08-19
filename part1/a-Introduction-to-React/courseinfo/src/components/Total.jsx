import PropTypes from 'prop-types'

const Total = ({ parts }) => {
  const total = parts.reduce((s, p) => {
    return s + p.exercises
  }, 0)
  return <p>Total of excersices {total}</p>
}

Total.propTypes = {
  parts: PropTypes.array,
}

export default Total
