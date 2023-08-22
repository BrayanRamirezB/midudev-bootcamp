import axios from 'axios'

// export const createNote = ({ content, important }) => {
//   return axios
//     .post('http://localhost:3001/api/notes', { content, important })
//     .then((response) => {
//       const { data } = response
//       return data
//     })
// }
export const createNote = (newObject) => {
  const request = axios.post('http://localhost:3001/api/notes', newObject)
  return request.then((response) => response.data)
}
