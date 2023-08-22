import PropTypes from 'prop-types'
import Person from './Person'
import './Persons.css'

const Persons = (props) => {
  return (
    <ol>
      {props.persons
        .filter((person) => {
          if (props.show.length === 0) return true
          return person.name.toUpperCase().includes(props.show.toUpperCase())
        })
        .map((person) => (
          <Person
            key={person.id}
            {...person}
            deletePerson={() => props.deletePerson(person.id)}
          />
        ))}
    </ol>
  )
}

Persons.propTypes = {
  persons: PropTypes.array,
  show: PropTypes.string,
  deletePerson: PropTypes.func
}

export default Persons
