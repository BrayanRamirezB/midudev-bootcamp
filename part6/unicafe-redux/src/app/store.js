import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counterReducer'

export default configureStore({
  reducer: {
    counter: counterReducer
  }
})
