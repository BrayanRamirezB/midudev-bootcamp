import express from 'express'
import Note from '../models/Note.mjs'

const notesRouter = express.Router()

notesRouter.get('/', async (req, res) => {
  const notes = await Note.find({})
  res.json(notes)
})

notesRouter.get('/:id', async (req, res, next) => {
  const { id } = req.params

  try {
    const note = await Note.findById(id)

    console.log(note)
    if (note) {
      return res.json(note)
    } else {
      res.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

notesRouter.delete('/:id', async (req, res, next) => {
  const { id } = req.params

  try {
    await Note.findByIdAndRemove(id)
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

notesRouter.post('/', async (req, res, next) => {
  const note = req.body

  if (!note || !note.content) {
    return res.status(400).json({ error: 'Content is missing' })
  }

  const createdNote = new Note({
    content: note.content,
    important: note.important || false,
    date: new Date().toISOString()
  })

  try {
    const savedNote = await createdNote.save()
    res.status(201).json(savedNote)
  } catch (error) {
    next(error)
  }
})

notesRouter.put('/:id', async (req, res, next) => {
  const { id } = req.params
  const note = req.body

  if (!('important' in note)) {
    return res.status(400).json({ error: 'Content is missing' })
  }

  const newNoteInfo = {
    important: note.important
  }

  try {
    const note = await Note.findByIdAndUpdate(id, newNoteInfo, { new: true })
    if (note) {
      res.status(200).json(note)
    } else {
      res.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

export default notesRouter
