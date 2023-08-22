import axios from 'axios'

// export const getAllNotes = () => {
//   return axios.get('http://localhost:3001/api/notes').then((response) => {
//     const { data } = response
//     return data
//   })
// }

export const getAllNotes = () => {
  const request = axios.get('http://localhost:3001/api/notes')
  return request.then((response) => response.data)
}
