import { gql } from '@apollo/client'

export const PERSON_ALL_DETAILS_FRAGMENT = gql`
  fragment PersonDetails on Person {
    name
    id
    phone
    address {
      city
      street
    }
  }
`

export const ALL_PERSONS = gql`
  query getPersons {
    allPersons {
      ...PersonDetails
    }
  }

  ${PERSON_ALL_DETAILS_FRAGMENT}
`
