import axios from 'axios'

const defaulURL = 'http://localhost:3001/api/persons'

export const getAllPersons = () => {
  const req = axios.get(defaulURL)
  return req.then((res) => res.data)
}

export const deleteIdPerson = (id) => {
  const req = axios.delete(`${defaulURL}/${id}`)
  return req.then((res) => res.data)
}

export const createPerson = (newObject) => {
  const req = axios.post(defaulURL, newObject)
  return req.then((res) => res.data)
}

export const updatePerson = (id, number) => {
  const req = axios.put(`${defaulURL}/${id}`, number)
  return req.then((res) => res.data)
}
