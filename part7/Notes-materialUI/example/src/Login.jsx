import { useState } from 'react'
import LoginForm from './components/LoginForm'
import { useNavigate } from 'react-router-dom'
import { useUser } from './hooks/useUser'
import PropTypes from 'prop-types'

const Login = ({ onLogin }) => {
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const { user, login } = useUser()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const u = await login({ username, password })

      setUsername('')
      setPassword('')

      onLogin(u)

      navigate('/')
    } catch (e) {
      setErrorMessage('Wrong Credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  if (errorMessage) {
    return <p>{errorMessage}</p>
  }

  if (user) {
    return <p>User is logged</p>
  }

  return (
    <LoginForm
      username={username}
      password={password}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={({ target }) => setPassword(target.value)}
      handleSubmit={handleLogin}
    />
  )
}

Login.propTypes = {
  onLogin: PropTypes.func
}

export default Login
