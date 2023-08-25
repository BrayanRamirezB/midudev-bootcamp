import express from 'express'
import Blog from '../models/Blog.mjs'

const blogsRouter = express.Router()

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs)
  } catch (error) {
    next(error)
  }
})

blogsRouter.post('/', async (request, response, next) => {
  const blog = request.body

  const newBlog = new Blog({
    title: blog.title,
    author: blog.author || 'anonymus',
    url: blog.url,
    likes: blog.likes || 0
  })

  try {
    const savedBlog = await newBlog.save()
    response.status(201).json(savedBlog)
  } catch (error) {
    next(error)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  const { id } = request.params

  try {
    await Blog.findByIdAndDelete(id)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const { id } = request.params
  const blog = request.body

  if (!('likes' in blog)) {
    return response.status(400).send({ error: 'New content is mising' })
  }

  const newBlogInfo = {
    likes: blog.likes
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, newBlogInfo, { new: true })
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
