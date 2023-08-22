import PropTypes from 'prop-types'

const Person = ({ name, number, deletePerson }) => {
  return (
    <li>
      <h3>
        {name} {number}
        <button onClick={deletePerson}>Delete</button>
      </h3>
    </li>
  )
}

Person.propTypes = {
  name: PropTypes.string,
  number: PropTypes.string,
  deletePerson: PropTypes.func
}

export default Person
