import express from 'express'
import Note from '../models/Note.mjs'

const notesRouter = express.Router()

notesRouter.get('/', (req, res, next) => {
  Note.find({})
    .then((notes) => {
      res.json(notes)
    })
    .catch((error) => {
      next(error)
    })
})

notesRouter.get('/:id', (req, res, next) => {
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

notesRouter.delete('/:id', (req, res, next) => {
  const { id } = req.params

  Note.findByIdAndRemove(id)
    .then((result) => {
      res.status(204).end()
    })
    .catch((error) => next(error))
})

notesRouter.post('/', (req, res, next) => {
  const note = req.body

  if (!note || !note.content) {
    return res.status(400).json({ error: 'Content is missing' })
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

notesRouter.put('/:id', (req, res, next) => {
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

export default notesRouter
