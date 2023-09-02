import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const createBlog = (newObject) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const request = axios.post(baseUrl, newObject, config)
  return request.then((response) => response.data)
}

const updateLikes = (id, blog) => {
  const url = `${baseUrl}/${id}`
  const config = {
    headers: {
      Authorization: token
    }
  }
  const request = axios.put(url, {id, blog}, config)
  return request.then((response) => response.data)
}

export default { getAll, setToken, createBlog, updateLikes }
