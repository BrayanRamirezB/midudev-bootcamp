import express from 'express'
import bcrypt from 'bcrypt'
import User from '../models/User.mjs'

const usersRouter = express.Router()

usersRouter.get('/', async (req, res, next) => {
  try {
    const users = await User.find({}).populate('blogs', {
      url: 1,
      title: 1,
      author: 1
    })
    res.json(users)
  } catch (error) {
    next(error)
  }
})

usersRouter.post('/', async (req, res, next) => {
  const body = req.body

  if (!body.password || body.password.length < 3) {
    return res.status(400).send({ error: 'Content is missing or invalid' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name || 'not defined',
    passwordHash
  })

  try {
    const savedUser = await user.save()
    res.status(201).json(savedUser)
  } catch (error) {
    next(error)
  }
})

export default usersRouter
