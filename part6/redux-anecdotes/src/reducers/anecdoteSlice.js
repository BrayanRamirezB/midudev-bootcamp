import { createSlice } from '@reduxjs/toolkit'
import { getAll, updateAnecdote, saveAnecdote } from '../services/anecdote'

export const anecdotesAtStart = () => {
  return async (dispatch) => {
    const anecdotes = await getAll()

    dispatch({
      type: 'anecdotes/initAnecdotes',
      payload: anecdotes
    })
  }
}

export const createAnecdote = (anecdote) => {
  return async (dispatch) => {
    const newAnecdote = await saveAnecdote(anecdote)

    dispatch({
      type: 'anecdotes/addAnecdote',
      payload: newAnecdote
    })
  }
}

export const voteAnecdote = (id) => {
  return async (dispatch, getState) => {
    const { anecdotes } = getState()
    const anecdoteToUpdate = anecdotes.find((anecdote) => anecdote.id === id)

    if (anecdoteToUpdate) {
      const updatedAnecdote = {
        ...anecdoteToUpdate,
        votes: anecdoteToUpdate.votes + 1
      }

      try {
        await updateAnecdote(id, updatedAnecdote)

        dispatch({
          type: 'anecdotes/addVote',
          payload: {
            id
          }
        })
      } catch (e) {
        console.error('Error updating anecdote')
      }
    }
  }
}

const initState = []

export const slice = createSlice({
  name: 'anecdotes',
  initialState: initState,
  reducers: {
    initAnecdotes: (state, action) => {
      return action.payload
    },
    addAnecdote: (state, action) => {
      return [...state, action.payload]
    },
    addVote: (state, action) => {
      const { id } = action.payload

      return state.map((anecdote) =>
        anecdote.id === id
          ? { ...anecdote, votes: anecdote.votes + 1 }
          : anecdote
      )
    }
  }
})

export default slice.reducer
