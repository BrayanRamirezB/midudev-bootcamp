import { createSlice } from '@reduxjs/toolkit'
import { setToken } from '../services/blogs'
import { notifyChange } from './notificationSlice'
import login from '../services/login'

export const setUser = ({ username, password }) => {
  return async (dispatch) => {
    try {
      const user = await login({ username, password })

      localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

      setToken(user.token)

      dispatch({
        type: 'users/putUser',
        payload: user
      })
    } catch (e) {
      dispatch(notifyChange('Wrong credentials', 'error', 5))
    }
  }
}

export const setSavedUser = (user) => {
  return (dispatch) => {
    setToken(user.token)

    dispatch({
      type: 'users/putUser',
      payload: user
    })
  }
}

export const resetUser = () => {
  return (dispatch) => {
    setToken(null)

    localStorage.removeItem('loggedBlogAppUser')

    dispatch({
      type: 'users/putUser',
      payload: {
        name: null,
        username: null,
        token: null
      }
    })
  }
}

const initialState = {
  name: null,
  username: null,
  token: null
}

const slice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    putUser: (state, action) => {
      const { name, username, token } = action.payload

      state.name = name
      state.username = username
      state.token = token
    }
  }
})

export default slice.reducer
