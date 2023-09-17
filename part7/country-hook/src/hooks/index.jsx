import { useState, useEffect } from 'react'
import { getCountryByName } from '../services/CountryService'

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

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (name) {
      getCountryByName(name)
        .then((c) => {
          setCountry({ ...c, found: true })
        })
        .catch(() => {
          setCountry({ found: false, data: null })
        })
    }
  }, [name])

  return country
}
