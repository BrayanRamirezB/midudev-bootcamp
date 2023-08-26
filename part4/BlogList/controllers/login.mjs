import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from '../models/User.mjs'

const loginRouter = express.Router()

loginRouter.post('/', async (req, res) => {
  const { body } = req
  const { username, password } = body

  if (!username || !password) {
    return res.status(400).json({ error: 'Content is missing' })
  }

  const user = await User.findOne({ username })
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return res.status(401).json({ error: 'invalid user or password' })
  }

  const userForToken = {
    id: user.id,
    username: user.username
  }

  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60 * 24 * 7
  })

  res.send({ name: user.name, username: user.username, token })
})

export default loginRouter
