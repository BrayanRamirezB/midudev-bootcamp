import 'dotenv/config'
import { GraphQLError } from 'graphql'
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import './db.js'
import Person from './models/person.js'
import User from './models/user.js'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.WORD_SECRET

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

  type User {
    username: String!
    friends: [Person]!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    personCount: Int!
    allPersons(phone: YesNo): [Person]!
    findPerson(name: String!): Person
    me: User
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
    createUser(
      username: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
    addAsFriend(
      name: String!
    ): User
  }
`
const resolvers = {
  Query: {
    personCount: () => Person.collection.countDocuments(),
    allPersons: async (root, args) => {
      if (!args.phone) return Person.find({})

      return Person.find({ phone: { $exists: args.phone === 'YES' } })
    },
    findPerson: async (root, args) => {
      const { name } = args

      return Person.findOne({ name })
    },
    me: async (root, args, context) => {
      return context.currentUser
    }
  },
  Mutation: {
    addPerson: async (root, args, context) => {
      const { currentUser } = context

      if (!currentUser)
        throw new GraphQLError(
          'You are not authorized to perform this action',
          {
            extensions: {
              code: 'FORBIDDEN'
            }
          }
        )

      const person = new Person({ ...args })

      try {
        await person.save()

        currentUser.friends = currentUser.friends.concat(person)
        await currentUser.save()
      } catch (err) {
        throw new GraphQLError('Invalid Arguments', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      return person
    },
    editNumber: async (root, args) => {
      const person = await Person.findOne({ name: args.name })
      if (!person) return null

      person.phone = args.phone

      try {
        await person.save()
      } catch (err) {
        throw new GraphQLError('Invalid Phone', {
          extensions: {
            code: 'BAD_USER_INPUT',
            argumentName: 'phone'
          }
        })
      }

      return person
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username })

      return user.save().catch((error) => {
        throw new GraphQLError('Invalid Arguments', {
          extensions: {
            code: 'BAD_USER_INPUT',
            argumentName: 'username'
          }
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== '1234') {
        throw new GraphQLError('Wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return {
        value: jwt.sign(userForToken, JWT_SECRET)
      }
    },
    addAsFriend: async (root, args, { currentUser }) => {
      if (!currentUser)
        throw new GraphQLError(
          'You are not authorized to perform this action',
          {
            extensions: {
              code: 'FORBIDDEN'
            }
          }
        )
      const person = await Person.findOne({ name: args.name })

      const nonFriendlyAlready = (person) =>
        !currentUser.friends.map((p) => p._id).includes(person._id)

      if (nonFriendlyAlready(person)) {
        currentUser.friends = currentUser.friends.concat(person)
        await currentUser.save()
      }

      return currentUser
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
  listen: { port: 4000 },
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null

    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const token = auth.substring(7)
      const { id } = jwt.verify(token, JWT_SECRET)
      if (id) {
        const currentUser = await User.findById(id).populate('friends')

        return { currentUser }
      }
    }
  }
})

console.log(`Sever ready at: ${url}`)
