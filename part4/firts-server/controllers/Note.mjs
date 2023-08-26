import express from 'express'
import Note from '../models/Note.mjs'
import User from '../models/User.mjs'
import userExtractor from '../utils/userExtractor.mjs'

const notesRouter = express.Router()

notesRouter.get('/', async (req, res) => {
  const notes = await Note.find({}).populate('user', { username: 1, name: 1 })
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

notesRouter.delete('/:id', userExtractor, async (req, res, next) => {
  const { id } = req.params

  try {
    await Note.findByIdAndRemove(id)
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

notesRouter.post('/', userExtractor, async (req, res, next) => {
  const note = req.body

  if (!note || !note.content) {
    return res.status(400).json({ error: 'Content is missing' })
  }

  const { userId } = req

  const user = await User.findById(userId)

  const createdNote = new Note({
    content: note.content,
    important: note.important || false,
    date: new Date().toISOString(),
    user: user._id
  })

  try {
    const savedNote = await createdNote.save()
    user.notes = user.notes.concat(savedNote._id)
    await user.save()

    res.status(201).json(savedNote)
  } catch (error) {
    next(error)
  }
})

notesRouter.put('/:id', userExtractor, async (req, res, next) => {
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
