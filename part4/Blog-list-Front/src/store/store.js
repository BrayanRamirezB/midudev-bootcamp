import { configureStore } from '@reduxjs/toolkit'
import notifyReducer from '../reducers/notificationSlice'
import blogReducer from '../reducers/blogSlice'
import userReducer from '../reducers/userSlice'

export default configureStore({
  reducer: {
    blogs: blogReducer,
    notifications: notifyReducer,
    users: userReducer
  }
})
