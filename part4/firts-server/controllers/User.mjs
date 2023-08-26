import bcrypt from 'bcrypt'
import express from 'express'
import User from '../models/User.mjs'

const usersRouter = express.Router()

usersRouter.get('/', async (request, response, next) => {
  try {
    const users = await User.find({}).populate('notes', { content: 1, date: 1 })
    response.json(users)
  } catch (error) {
    next(error)
  }
})

usersRouter.post('/', async (request, response, next) => {
  const body = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash
  })

  try {
    const savedUser = await user.save()
    response.status(201).json(savedUser)
  } catch (error) {
    next(error)
  }
})

export default usersRouter
