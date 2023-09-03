import './mongo.mjs'
import express from 'express'
import cors from 'cors'
import blogsRouter from './controllers/Blog.mjs'
import usersRouter from './controllers/User.mjs'
import loginRouter from './controllers/login.mjs'
import { requestLogger, NotFound, handleErrors } from './utils/middleware.mjs'
import testingRouter from './controllers/testing.mjs'

const app = express()

app.use(cors())
app.use(express.json())
app.use(requestLogger)

app.use('/api/login', loginRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

if (process.env.NODE_ENV === 'test') {
  app.use('/api/testing', testingRouter)
}

app.use(NotFound)
app.use(handleErrors)

export default app
