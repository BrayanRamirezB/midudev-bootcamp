import 'dotenv/config'
import './mongo.mjs'

import Note from './models/Note.mjs'
import express from 'express'
import cors from 'cors'
import logger from './middleware/loggerMiddleware.mjs'
import NotFound from './middleware/NotFound.mjs'
import handleErrors from './middleware/handleErrors.mjs'

const app = express()

// Un middleware intercepta la peticion que pasa por la api
app.use(cors())
app.use(express.json())
app.use(logger)

app.get('/', (req, res) => {
  res.send('<h1>Hello Express</h1>')
})

app.get('/api/notes', (req, res, next) => {
  Note.find({})
    .then((notes) => {
      res.json(notes)
    })
    .catch((error) => {
      next(error)
    })
})

app.get('/api/notes/:id', (req, res, next) => {
  const { id } = req.params

  Note.findById(id)
    .then((note) => {
      if (note) {
        return res.json(note)
      } else {
        res.status(404).end()
      }
    })
    .catch(next)
})

app.delete('/api/notes/:id', (req, res, next) => {
  const { id } = req.params

  Note.findByIdAndRemove(id)
    .then((result) => {
      res.status(204).end()
    })
    .catch((error) => next(error))
})

app.post('/api/notes', (req, res, next) => {
  const note = req.body

  if (!note || !note.content) {
    return res.status(400).json({ error: 'note.content is missing' })
  }

  const createdNote = new Note({
    content: note.content,
    important: note.important || false,
    date: new Date().toISOString()
  })

  createdNote
    .save()
    .then((savedNote) => {
      res.status(201).json(savedNote)
    })
    .catch((error) => {
      next(error)
    })
})

app.put('/api/notes/:id', (req, res, next) => {
  const { id } = req.params
  const note = req.body

  const newNoteInfo = {
    content: note.content,
    important: note.important
  }

  Note.findByIdAndUpdate(id, newNoteInfo, { new: true })
    .then((result) => {
      res.status(200).json(result)
    })
    .catch((error) => {
      next(error)
    })
})

app.use(NotFound)

// Control de errores para rutas desconocidas
app.use(handleErrors)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`)
})
