import 'dotenv/config'

const PORT = process.env.PORT
const connectionString = process.env.MONGO_DB_URI

export default {
  PORT,
  connectionString
}
