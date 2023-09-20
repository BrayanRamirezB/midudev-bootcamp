import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/userSlice.js'

import PropTypes from 'prop-types'

const LoginForm = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    dispatch(setUser({ username, password }))

    setUsername('')
    setPassword('')
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
