import axios from 'axios'

export const createNote = ({ userId, title, body }) => {
  return axios
    .post('https://jsonplaceholder.typicode.com/posts', { userId, title, body })
    .then((response) => {
      const { data } = response
      return data
    })
}
