import { useState } from 'react'
import login from '../services/login.js'
import PropTypes from 'prop-types'

const LoginForm = ({ handleUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await login({ username, password })

      localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

      handleUser(user)
      setUsername('')
      setPassword('')
    } catch (e) {
      handleUser(null)
    }
  }

  return (
    <div>
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
        <button id='form-login-button' type='submit'>
          Login
        </button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleUser: PropTypes.func
}

export default LoginForm
