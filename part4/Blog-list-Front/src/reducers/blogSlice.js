import { createSlice } from '@reduxjs/toolkit'
import { notifyChange } from './notificationSlice'
import { getAll, createBlog, updateLikes, deleteBlog } from '../services/blogs'

export const getInitBlogs = () => {
  return async (dispatch) => {
    const blogs = await getAll()

    dispatch({
      type: 'blogs/initBlogs',
      payload: blogs
    })
  }
}

export const addNewBlog = (blog, username) => {
  return async (dispatch) => {
    try {
      const newBlog = await createBlog(blog)

      dispatch({
        type: 'blogs/addBlog',
        payload: newBlog
      })

      dispatch(
        notifyChange(
          `A new blog ${newBlog.title} was added by ${username}`,
          'success',
          5
        )
      )
    } catch (e) {
      dispatch(notifyChange('Something went wrong', 'error', 5))
    }
  }
}

export const updateOneBlogLikes = (id, username) => {
  return async (dispatch, getState) => {
    const { blogs } = getState()
    const blogToUpdate = blogs.find((b) => b.id === id)

    if (blogToUpdate) {
      const updatedBlog = {
        ...blogToUpdate,
        likes: blogToUpdate.likes + 1
      }

      try {
        await updateLikes(id, updatedBlog)

        dispatch({
          type: 'blogs/addLike',
          payload: {
            id
          }
        })

        dispatch(
          notifyChange(
            `${updatedBlog.title} received a like from ${username}`,
            'success',
            5
          )
        )
      } catch (e) {
        dispatch(notifyChange('Something went wrong', 'error', 5))
      }
    }
  }
}

export const deleteOneBlog = (id, username) => {
  return async (dispatch, getState) => {
    const { blogs } = getState()
    const blogToDelete = blogs.find((b) => b.id === id)

    if (blogToDelete) {
      try {
        await deleteBlog(id)

        dispatch({
          type: 'blogs/removeBlog',
          payload: {
            id
          }
        })

        dispatch(
          notifyChange(
            `${blogToDelete.title} was removed from ${username}`,
            'success',
            5
          )
        )
      } catch (e) {
        dispatch(notifyChange(e.response.data.error, 'error', 5))
      }
    }
  }
}

const initialState = []

const slice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    initBlogs: (state, action) => {
      return action.payload
    },
    addBlog: (state, action) => {
      return [...state, action.payload]
    },
    addLike: (state, action) => {
      const { id } = action.payload

      return state.map((blog) =>
        blog.id === id ? { ...blog, likes: blog.likes + 1 } : blog
      )
    },
    removeBlog: (state, action) => {
      const { id } = action.payload
      return state.filter((blog) => blog.id !== id)
    }
  }
})

export default slice.reducer
