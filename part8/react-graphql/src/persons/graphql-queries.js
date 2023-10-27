import { gql } from '@apollo/client'

export const ALL_PERSONS = gql`
  query getPersons {
    allPersons {
      name
      id
      phone
      address {
        city
        street
      }
    }
  }
`
