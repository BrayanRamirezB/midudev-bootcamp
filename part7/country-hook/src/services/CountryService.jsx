import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/'

export const getCountryByName = async (name) => {
  const nameUrl = `${baseUrl}api/name/${name}`
  const response = await axios.get(nameUrl)

  return response
}
