import mongoose from 'mongoose'

const MONGODV_URI = process.env.MONGO_DB_URI

// conexion a mongodb
mongoose
  .connect(MONGODV_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Database connected')
  })
  .catch((err) => {
    console.error(err)
  })

process.on('uncaughtException', () => {
  mongoose.connection.close()
})
