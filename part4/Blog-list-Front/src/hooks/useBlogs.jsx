import {
  addNewBlog,
  deleteOneBlog,
  updateOneBlogLikes,
  getInitBlogs
} from '../reducers/blogSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

export const useBlogs = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const sortenedBlogs = blogs.slice().sort((a, b) => b.likes - a.likes)

  useEffect(() => {
    dispatch(getInitBlogs())
  }, [dispatch])

  const addBlog = (blogToAddState, username) => {
    dispatch(addNewBlog(blogToAddState, username))
  }

  const updateBlogLikes = (id, username) => {
    dispatch(updateOneBlogLikes(id, username))
  }

  const removeBlog = (id, username) => {
    dispatch(deleteOneBlog(id, username))
  }

  const findUserBlogs = (id) => {
    const userBlogs = blogs.filter((blog) => blog.user.id === id)

    return userBlogs
  }

  const findBlogById = (id) => {
    const blog = blogs.find((blog) => blog.id === id)

    return blog
  }

  return {
    blogs,
    sortenedBlogs,
    findUserBlogs,
    addBlog,
    updateBlogLikes,
    removeBlog,
    findBlogById
  }
}
