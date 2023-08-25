import mongoose from 'mongoose'
import config from './utils/config.mjs'
import logger from './utils/logger.mjs'

mongoose.connect(config.connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    logger.info('Database connected')
  })
  .catch((err) => {
    logger.error(err)
  })

process.on('uncaughtException', () => {
  mongoose.connection.close()
})
