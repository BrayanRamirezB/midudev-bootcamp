import PropTypes from 'prop-types'
import { useState } from 'react'
import Togglable from './Togglable'
import loginService from '../services/login.js'

const LoginForm = ({ handleUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(user))

      handleUser(user)
      setUsername('')
      setPassword('')
    } catch (e) {
      handleUser(null)
    }
  }

  return (
    <Togglable buttonLabel='Show Login'>
      <form onSubmit={handleLogin}>
        <input
          type='text'
          value={username}
          name='Username'
          placeholder='Username'
          onChange={({ target }) => setUsername(target.value)}
        />

        <input
          type='password'
          value={password}
          name='Password'
          placeholder='Password'
          onChange={({ target }) => setPassword(target.value)}
        />

        <button type='submit'>Login</button>
      </form>
    </Togglable>
  )
}

LoginForm.propTypes = {
  handleUser: PropTypes.func
}

export default LoginForm
