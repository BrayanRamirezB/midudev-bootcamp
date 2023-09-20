import axios from 'axios'
const defaultURL = 'http://localhost:3001/api/login'

const login = async (credentials) => {
  const { data } = await axios.post(defaultURL, credentials)
  return data
}

export default { login }
