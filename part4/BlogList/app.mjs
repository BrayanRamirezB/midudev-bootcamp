import './mongo.mjs'
import express from 'express'
import cors from 'cors'
import blogsRouter from './controllers/Blog.mjs'
import { requestLogger, NotFound, handleErrors } from './utils/middleware.mjs'

const app = express()

app.use(cors())
app.use(express.json())
app.use(requestLogger)

app.use('/api/blogs', blogsRouter)

app.use(NotFound)
app.use(handleErrors)

export default app
