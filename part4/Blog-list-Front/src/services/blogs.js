import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

export const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

export const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export const createBlog = async (newObject) => {
  const config = {
    headers: {
      Authorization: token
    }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

export const updateLikes = async (id, blog) => {
  const url = `${baseUrl}/${id}`
  const config = {
    headers: {
      Authorization: token
    }
  }

  const response = await axios.put(url, blog, config)
  return response.data
}

export const deleteBlog = async (id) => {
  const url = `${baseUrl}/${id}`
  const config = {
    headers: {
      Authorization: token
    }
  }

  const response = await axios.delete(url, config)
  return response.data
}
