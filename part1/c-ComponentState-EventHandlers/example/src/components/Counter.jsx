import PropTypes from 'prop-types'

//Un componente se vuelve a renderizar simpre que que lleguen props, no importa si son iguales
const Counter = ({ number }) => {
  return <h1>{number}</h1>
}

Counter.propTypes = {
  number: PropTypes.number,
}

export default Counter
