import './mongo.mjs'
import express from 'express'
import cors from 'cors'
import { requestLogger, notFound, handleErrors } from './utils/middleware.mjs'
import notesRouter from './controllers/Note.mjs'
import usersRouter from './controllers/User.mjs'
import loginRouter from './controllers/login.mjs'
import testingRouter from './controllers/testing.mjs'

const app = express()

// Un middleware intercepta la peticion que pasa por la api
app.use(cors())
app.use(express.json())
app.use(requestLogger)

app.use('/api/notes', notesRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
  app.use('/api/testing', testingRouter)
}

app.use(notFound)
// Control de errores para rutas desconocidas
app.use(handleErrors)

export default app
