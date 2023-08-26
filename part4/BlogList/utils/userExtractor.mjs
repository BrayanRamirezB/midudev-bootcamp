import jwt from 'jsonwebtoken'

export const getTokenFrom = (request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    return authorization.substring(7)
  }
}

export const userExtractor = async (request, response, next) => {
  const token = getTokenFrom(request)

  let decodedToken = ''

  try {
    decodedToken = jwt.verify(token, process.env.SECRET)
  } catch {}

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'Token is missing or invalid' })
  }

  const { id: userId } = decodedToken
  request.userId = userId

  next()
}
