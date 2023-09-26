import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { v1 as uuid } from 'uuid'

let authors = [
  {
    name: 'Robert Martin',
    id: 'afa51ab0-344d-11e9-a414-719c6709cf3e',
    born: 1952
  },
  {
    name: 'Martin Fowler',
    id: 'afa5b6f0-344d-11e9-a414-719c6709cf3e',
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: 'afa5b6f1-344d-11e9-a414-719c6709cf3e',
    born: 1821
  },
  {
    name: 'Joshua Kerievsky',
    id: 'afa5b6f2-344d-11e9-a414-719c6709cf3e'
  },
  {
    name: 'Sandi Metz',
    id: 'afa5b6f3-344d-11e9-a414-719c6709cf3e'
  }
]

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: 'afa5b6f4-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: 'afa5b6f5-344d-11e9-a414-719c6709cf3e',
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: 'afa5de00-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: 'afa5de01-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring', 'patterns']
  },
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: 'afa5de02-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: 'afa5de03-344d-11e9-a414-719c6709cf3e',
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: 'afa5de04-344d-11e9-a414-719c6709cf3e',
    genres: ['classic', 'revolution']
  }
]

const typeDefs = `#graphql
  enum Genres {
    classic
    revolution
    crime
    refactoring
    design
    patterns
    agile
  }

  type Book {
    title: String!
    published: Int!
    author: String!
    id: ID!
    genres: [Genres]!
  }

  type Author {
    bookCount: Int!
    name: String!
    born: Int
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]!
    allAuthors: [Author]
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [Genres]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => {
      const { author, genre } = args

      if (!author && !genre) return books

      const filteredBooks = books.filter((book) => {
        const authorMatch = !author || book.author === author
        const genreMatch = !genre || book.genres.includes(genre)
        return authorMatch && genreMatch
      })

      return filteredBooks
    },
    allAuthors: () => {
      const newAuthors = authors.map((a) => ({
        ...a,
        bookCount: books.filter((b) => b.author === a.name).length
      }))

      return newAuthors
    }
  },
  Mutation: {
    addBook: (root, args) => {
      const book = { ...args, id: uuid() }

      if (!authors.find((a) => a.name === book.author))
        authors.push({ name: book.author, id: uuid() })

      books.push(book)

      return book
    },
    editAuthor: (root, args) => {
      const { name, setBornTo } = args
      const authorIndex = authors.findIndex((a) => a.name === name)

      if (authorIndex === -1) return null

      const author = authors[authorIndex]
      const newAuthor = { ...author, born: setBornTo }

      authors[authorIndex] = newAuthor

      return newAuthor
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
