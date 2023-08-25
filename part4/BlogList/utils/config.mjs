import 'dotenv/config'

const { MONGO_DB_URI, MONGO_DB_URI_TEST, NODE_ENV } = process.env

const PORT = process.env.PORT
const connectionString = NODE_ENV === 'test' ? MONGO_DB_URI_TEST : MONGO_DB_URI

export default {
  PORT,
  connectionString
}
