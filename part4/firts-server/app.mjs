import './mongo.mjs'
import express from 'express'
import cors from 'cors'
import { requestLogger, notFound, handleErrors } from './utils/middleware.mjs'
import notesRouter from './controllers/Note.mjs'

const app = express()

// Un middleware intercepta la peticion que pasa por la api
app.use(cors())
app.use(express.json())
app.use(requestLogger)

app.use('/api/notes', notesRouter)

app.use(notFound)
// Control de errores para rutas desconocidas
app.use(handleErrors)

export default app
