import logger from './logger.mjs'

export const requestLogger = (req, res, next) => {
  console.log(req.method)
  console.log(req.path)
  console.log(res.body)
  console.log('------')
  next()
}

export const notFound = (req, res, next) => {
  res.status(404).end()
}

export const handleErrors = (error, req, res, next) => {
  logger.error(error)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'id used is malformed' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'token missing or invalid' })
  } else if (error.name === 'TokenExpirerError') {
    return res.status(401).json({ error: 'token expired' })
  } else {
    res.status(500).end()
  }

  next(error)
}
