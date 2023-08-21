import { useState, useEffect } from 'react'
import './App.css'

const INIT_STATE_COUNTRIES = []

function App() {
  const [countries, setCountries] = useState(INIT_STATE_COUNTRIES)
  const [show, setShow] = useState('')

  useEffect(() => {
    setTimeout(() => {
      fetch('https://restcountries.com/v3.1/all')
        .then((response) => response.json())
        .then((json) => {
          setCountries(json)
        })
    }, 2000)
  }, [])

  const handleChange = (event) => {
    setShow(event.target.value)
  }

  const filteredCountries = countries.filter((country) => {
    if (show.length === 0) return true
    return country.name.official.toUpperCase().includes(show.toUpperCase())
  })

  const resultCount = filteredCountries.length

  const countryProps = filteredCountries.map((country) => (
    <li key={country.name.official}>
      {country.name.official} <br /> <h3>Population</h3> {country.population}{' '}
      <br /> <h3>Languages</h3>
      <img src={country.flags.png} alt="" />
    </li>
  ))

  const countryList = filteredCountries.map((country) => (
    <li key={country.name.official}>{country.name.official} </li>
  ))

  const conditional = resultCount === 1 ? countryProps : countryList

  const moreThenCountries =
    resultCount > 10 ? 'Too many matches, specify another filter' : conditional

  return (
    <>
      <div>
        <span>find countries </span>
        <input type="text" value={show} onChange={handleChange} />
      </div>
      <div>
        <ol>{show.length === 0 ? countryList : moreThenCountries}</ol>
      </div>
    </>
  )
}

export default App
