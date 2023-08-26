import logger from './utils/logger.mjs'
import config from './utils/config.mjs'
import app from './app.mjs'

const server = app.listen(config.PORT, () => {
  logger.info(`Server running on port http://localhost:${config.PORT}/api/`)
})

export { app, server }
