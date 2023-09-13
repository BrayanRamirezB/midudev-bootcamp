import { configureStore, combineReducers } from '@reduxjs/toolkit'
import notesReducer from '../features/note/noteReducer'
// import notesReducer from '../features/note/noteSlice' using Slice
import filterReducer from '../features/note/filterReducer'

const reducer = combineReducers({
  notes: notesReducer,
  filter: filterReducer
})

const store = configureStore({
  reducer
})

export default store
