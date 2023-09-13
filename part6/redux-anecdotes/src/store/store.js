import { configureStore } from '@reduxjs/toolkit'
// import anecdoteReducer from '../reducers/anecdoteReducer'
import anecdoteReducer from '../reducers/anecdoteSlice'
import notifyReducer from '../reducers/notificationSlice'

export default configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    notifications: notifyReducer
  }
})
