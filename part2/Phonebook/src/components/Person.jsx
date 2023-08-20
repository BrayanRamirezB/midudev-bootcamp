import PropTypes from 'prop-types'

const Person = ({ name, number }) => {
  return (
    <li>
      <h3>
        {name} {number}
      </h3>
    </li>
  )
}

Person.propTypes = {
  name: PropTypes.string,
  number: PropTypes.string,
}

export default Person
