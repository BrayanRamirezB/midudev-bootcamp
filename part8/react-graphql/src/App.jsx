import Persons from './components/Persons'
import FindPerson from './components/FindPerson'
import PersonForm from './components/PersonForm'
import NotifyError from './components/NotifyError'
import { useState } from 'react'
import './App.css'
import PhoneForm from './components/PhoneForm'
import LoginForm from './components/LoginForm'
import { useApolloClient } from '@apollo/client'

function App() {
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(
    () => !!localStorage.getItem('phonenumbers-user-token')
  )
  const client = useApolloClient()

  const notifyError = (message) => {
    setErrorMessage(message)
    setTimeout(() => setErrorMessage(null), 5000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <NotifyError message={errorMessage} />
      <br />
      <Persons />
      <br />
      <FindPerson name={'Sergio Perez'} />
      <br />
      <PersonForm notifyError={notifyError} />
      <br />
      <PhoneForm notifyError={notifyError} />
      <br />
      {token ? (
        <button onClick={logout}>Log Out</button>
      ) : (
        <LoginForm notifyError={notifyError} setToken={setToken} />
      )}
    </div>
  )
}

export default App
