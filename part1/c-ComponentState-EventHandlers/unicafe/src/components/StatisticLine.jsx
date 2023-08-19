import PropTypes from 'prop-types'

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

StatisticLine.propTypes = {
  text: PropTypes.string,
  value: PropTypes.number,
}

export default StatisticLine
