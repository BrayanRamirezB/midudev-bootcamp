import { createSlice } from '@reduxjs/toolkit'

export const notifyChange = (message, typeOfM, seg) => async (dispatch) => {
  const time = seg * 1000

  dispatch({
    type: 'notifications/setMessage',
    payload: {
      message,
      typeOfM
    }
  })

  setTimeout(() => {
    dispatch({
      type: 'notifications/setMessage',
      payload: {
        message: '',
        typeOfM: ''
      }
    })
  }, time)
}

const initialState = {
  message: '',
  typeOfM: ''
}

const slice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setMessage: (state, action) => {
      const { message, typeOfM } = action.payload
      state.message = message
      state.typeOfM = typeOfM
    }
  }
})

export default slice.reducer
