import express from 'express'
import Blog from '../models/Blog.mjs'
import User from '../models/User.mjs'
import { userExtractor } from '../utils/userExtractor.mjs'

const blogsRouter = express.Router()

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
  } catch (error) {
    next(error)
  }
})

blogsRouter.get('/:id', async (request, response, next) => {
  const { id } = request.params

  try {
    const blog = await Blog.findById(id)

    if (blog) {
      return response.json(blog)
    } else {
      response.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

blogsRouter.post('/', userExtractor, async (request, response, next) => {
  const blog = request.body

  if (!blog) {
    return response.status(400).json({ error: 'Content is missing' })
  }

  const { userId } = request
  const user = await User.findById(userId)

  const newBlog = new Blog({
    title: blog.title,
    author: blog.author || 'anonymus',
    url: blog.url,
    likes: blog.likes || 0,
    user: user._id
  })

  try {
    const savedBlog = await newBlog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
  } catch (error) {
    next(error)
  }
})

blogsRouter.delete('/:id', userExtractor, async (request, response, next) => {
  const { id } = request.params

  const { userId } = request
  const blog = await Blog.findById(id)

  if (!blog) {
    return response.status(404).end()
  }

  if (blog.user.toString() !== userId.toString()) {
    return response.status(401).json({ error: 'user invalid' })
  }

  try {
    await Blog.findByIdAndDelete(id)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

blogsRouter.put('/:id', userExtractor, async (request, response, next) => {
  const { id } = request.params
  const content = request.body

  const { userId } = request
  const blog = await Blog.findById(id)

  if (!blog) {
    return response.status(404).end()
  }

  if (blog.user.toString() !== userId.toString()) {
    return response.status(401).json({ error: 'user invalid' })
  }

  if (!('likes' in content)) {
    return response.status(400).send({ error: 'New likes is mising' })
  }

  const newBlogInfo = {
    likes: content.likes
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, newBlogInfo, {
      new: true
    })
    if (updatedBlog) {
      response.status(200).json(updatedBlog)
    } else {
      response.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

export default blogsRouter
