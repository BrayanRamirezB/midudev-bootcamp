import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAll = async () => {
  const response = await axios.get(baseUrl)

  return response.data
}

export const saveAnecdote = async (content) => {
  const anecdote = { content, votes: 0 }
  const response = await axios.post(baseUrl, anecdote)

  return response.data
}

export const updateAnecdote = async (id, anecdote) => {
  const anecdoteUrl = `${baseUrl}/${id}`
  const response = await axios.patch(anecdoteUrl, anecdote)

  return response.data
}
