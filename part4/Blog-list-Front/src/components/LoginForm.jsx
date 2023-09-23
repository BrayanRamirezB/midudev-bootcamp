import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/userSlice.js'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'

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
    <Container>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='text'
            value={username}
            name='Username'
            placeholder='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            value={password}
            name='Password'
            placeholder='Password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </Form.Group>

        <Button variant='success' id='form-login-button' type='submit'>
          Login
        </Button>
      </Form>
    </Container>
  )
}

LoginForm.propTypes = {
  handleUser: PropTypes.func
}

export default LoginForm
