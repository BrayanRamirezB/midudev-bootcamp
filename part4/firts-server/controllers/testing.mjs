import express from 'express'
import Note from '../models/Note.mjs'
import User from '../models/User.mjs'

const testingRouter = express.Router()

testingRouter.post('/reset', async (req, res) => {
  await Note.deleteMany({})
  await User.deleteMany({})
  res.status(204).end()
})

export default testingRouter
