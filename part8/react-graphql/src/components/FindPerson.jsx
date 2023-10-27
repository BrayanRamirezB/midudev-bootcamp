import { gql, useQuery } from '@apollo/client'
import PropTypes from 'prop-types'

const FIND_PERSON = gql`
  query FindPerson($name: String!) {
    findPerson(name: $name) {
      name
      phone
      address {
        city
        street
      }
    }
  }
`

const FindPerson = ({ name }) => {
  const { loading, error, data } = useQuery(FIND_PERSON, {
    variables: { name }
  })

  if (loading) return null

  if (error) return `Error ${error}`

  return (
    <div>
      {data.findPerson ? (
        <div>
          {data.findPerson.name} {data.findPerson.address.city}
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

FindPerson.propTypes = {
  name: PropTypes.string
}

export default FindPerson
