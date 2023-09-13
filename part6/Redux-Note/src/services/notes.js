import axios from 'axios'

const baseUrl = 'http://localhost:3001/notes'

export const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export const createNew = async (content) => {
  const note = { content, important: false }
  const response = await axios.post(baseUrl, note)
  return response.data
}

export const updateNote = async (id, note) => {
  const url = `${baseUrl}/${id}`
  const response = await axios.put(url, note)
  return response.data
}
