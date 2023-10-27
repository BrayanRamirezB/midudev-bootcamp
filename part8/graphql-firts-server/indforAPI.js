import { ApolloServer } from '@apollo/server'
import { GraphQLError } from 'graphql'
import { startStandaloneServer } from '@apollo/server/standalone'
import { v1 as uuid } from 'uuid'
import axios from 'axios'

const typeDefs = `#graphql
  enum YesNo {
    YES
    NO
  }

  type Address {
    street: String!
    city: String!
  }

  type Person {
    name: String!
    phone: String
    address: Address!
    id: ID! 
  }

  type Query {
    personCount: Int!
    allPersons(phone: YesNo): [Person]!
    findPerson(name: String!): Person
  }

  type Mutation {
    addPerson(
      name: String!
      phone: String
      street: String!
      city: String!
    ): Person
    editNumber(
      name: String!
      phone: String!
    ): Person
  }
`
const resolvers = {
  Query: {
    personCount: () => persons.length,
    allPersons: async (root, args) => {
      const { data: persons } = await axios.get('http://localhost:3000/persons')

      if (!args.phone) return persons

      const byPhone = (person) =>
        args.phone === 'YES' ? person.phone : !person.phone

      return persons.filter(byPhone)
    },
    findPerson: async (root, args) => {
      const { name } = args

      const { data: persons } = await axios.get(`http://localhost:3000/persons`)

      return persons.find((person) => person.name === name)
    }
  },
  Mutation: {
    addPerson: async (root, args) => {
      const { data: persons } = await axios.get('http://localhost:3000/persons')

      if (persons.find((p) => p.name === args.name)) {
        throw new GraphQLError('Name must be unique', {
          extensions: {
            code: 'BAD_USER_INPUT',
            argumentName: 'name'
          }
        })
      }

      const person = { ...args, id: uuid() }
      const newPerson = await axios.post(
        'http://localhost:3000/persons',
        person
      ) // update database
      return newPerson.data
    },
    editNumber: async (root, args) => {
      const { data: persons } = await axios.get('http://localhost:3000/persons')

      const person = persons.find((p) => p.name === args.name)
      if (!person) return null

      const updatedPerson = { ...person, phone: args.phone }

      const updatedPhonePerson = await axios.put(
        `http://localhost:3000/persons/${person.id}`,
        updatedPerson
      )

      return updatedPhonePerson.data
    }
  },
  Person: {
    address: (root) => {
      return {
        street: root.street,
        city: root.city
      }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 }
})

console.log(`Sever ready at: ${url}`)
