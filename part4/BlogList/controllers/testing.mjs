import express from 'express'
import Blog from '../models/Blog.mjs'
import User from '../models/User.mjs'

const testingRouter = express.Router()

testingRouter.post('/reset', async (req, res) => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  res.status(204).end()
})

export default testingRouter
