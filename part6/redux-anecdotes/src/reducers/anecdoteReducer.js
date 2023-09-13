import { getAll } from '../services/anecdote'

export const initAnecdotes = async () => {
  return async (dispatch) => {
    const anecdotes = await getAll()

    dispatch({
      type: '@anecdote/init',
      payload: anecdotes
    })
  }
}

export const createAnecdote = (anecdote) => {
  return {
    type: '@anecdote/create',
    payload: {
      content: anecdote,
      id: 9,
      votes: 0
    }
  }
}

export const voteAnecdote = (id) => {
  return {
    type: '@anecdote/vote',
    payload: {
      id
    }
  }
}

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case '@anecdote/init': {
      return action.payload
    }

    case '@anecdote/create': {
      return state.concat(action.payload)
    }

    case '@anecdote/vote': {
      const { id } = action.payload

      return state.map((anecdote) => {
        if (anecdote.id === id) {
          return {
            ...anecdote,
            votes: anecdote.votes + 1
          }
        }
        return anecdote
      })
    }
    default:
      return state
  }
}

export default anecdoteReducer
