import app from './app.mjs'
import config from './utils/config.mjs'
import logger from './utils/logger.mjs'

const server = app.listen(config.PORT, () => {
  logger.info(`Server running on port http://localhost:${config.PORT}/api/blogs`)
})

export default server
