import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: ''
}

export const notifyChange = (message, seg) => async (dispatch) => {
  const time = seg * 1000

  dispatch({
    type: 'notifications/setMessage',
    payload: {
      message
    }
  })
  setTimeout(() => {
    dispatch({
      type: 'notifications/setMessage',
      payload: {
        message: ''
      }
    })
  }, time)
}

export const slice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setMessage: (state, action) => {
      const { message } = action.payload
      state.message = message
    }
  }
})

export default slice.reducer
