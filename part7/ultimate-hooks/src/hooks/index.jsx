import { useEffect, useState } from 'react'
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await axios.get(baseUrl)
        setResources(response.data)
      } catch (error) {
        console.error('Error fetching resources:', error)
        setResources([])
      }
    }

    // Llama a la función para obtener los recursos al montar el componente
    fetchResources()
  }, [baseUrl])

  const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then((response) => response.data)
  }

  const create = async (newObject) => {
    const response = await axios.post(baseUrl, newObject)
    setResources((prevResources) => [...prevResources, response.data])
    return response.data
  }

  const update = async (id, newObject) => {
    const response = await axios.put(`${baseUrl}/${id}`, newObject)

    setResources((prevResources) =>
      prevResources.map((resource) =>
        resource.id === id ? response.data : resource
      )
    )
    return response.data
  }

  const service = {
    create,
    getAll,
    update
  }

  return [resources, service]
}
