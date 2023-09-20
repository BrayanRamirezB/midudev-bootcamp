import axios from 'axios'

const defaultURL = 'http://localhost:3001/api/notes'

let token = null

export const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

export const getAllNotes = () => {
  const request = axios.get(defaultURL)
  return request.then((response) => response.data)
}

export const createNote = (newObject) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const request = axios.post(defaultURL, newObject, config)
  return request.then((response) => response.data)
}

export const updateImportance = (id, note) => {
  const url = `${defaultURL}/${id}`

  const config = {
    headers: {
      Authorization: token
    }
  }

  const request = axios.put(url, note, config)
  return request.then((response) => response.data)
}
