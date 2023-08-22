import axios from 'axios'

// export const getAllNotes = () => {
//   return axios.get('http://localhost:3001/api/notes').then((response) => {
//     const { data } = response
//     return data
//   })
// }
const defaultURL = 'http://localhost:3001/api/notes'

export const getAllNotes = () => {
  const request = axios.get(defaultURL)
  return request.then((response) => response.data)
}

export const createNote = (newObject) => {
  const request = axios.post(defaultURL, newObject)
  return request.then((response) => response.data)
}

export const updateImportance = (id, note) => {
  const url = `${defaultURL}/${id}`

  const request = axios.patch(url, note)
  return request.then((response) => response.data)
}
