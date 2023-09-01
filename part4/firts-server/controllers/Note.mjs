import express from 'express'
import Note from '../models/Note.mjs'
import User from '../models/User.mjs'
import { userExtractor } from '../utils/userExtractor.mjs'

const notesRouter = express.Router()

notesRouter.get('/', async (req, res, next) => {
  try {
    const notes = await Note.find({}).populate('user', { username: 1, name: 1 })
    res.json(notes)
  } catch (error) {
    next(error)
  }
})

notesRouter.get('/:id', async (req, res, next) => {
  const { id } = req.params

  try {
    const note = await Note.findById(id)

    if (note) {
      return res.json(note)
    } else {
      res.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

notesRouter.put('/:id', userExtractor, async (req, res, next) => {
  const { id } = req.params
  const content = req.body

  if (!('important' in content)) {
    return res.status(400).json({ error: 'Content is missing' })
  }

  const newNoteInfo = {
    important: content.important
  }

  try {
    const noteSaved = await Note.findByIdAndUpdate(id, newNoteInfo, {
      new: true
    })
    if (noteSaved) {
      res.status(200).json(noteSaved)
    } else {
      res.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

notesRouter.delete('/:id', userExtractor, async (req, res, next) => {
  const { id } = req.params

  const { userId } = req
  const note = await Note.findById(id)

  if (!note) {
    return res.status(404).end()
  }

  if (note.user.toString() !== userId.toString()) {
    return res.status(401).json({ error: 'user invalid' })
  }

  try {
    await Note.findByIdAndRemove(id)
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

notesRouter.post('/', userExtractor, async (req, res, next) => {
  const note = req.body

  if (!note.content) {
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

export default notesRouter
