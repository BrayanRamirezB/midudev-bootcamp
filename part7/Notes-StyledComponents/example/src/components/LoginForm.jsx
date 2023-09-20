import PropTypes from 'prop-types'
import { Button } from './styles/Button'

const LoginForm = ({ handleSubmit, ...props }) => {
  return (
    <form data-test-id='login-form' onSubmit={handleSubmit}>
      <input
        type='text'
        value={props.username}
        onChange={props.handleUsernameChange}
        name='Username'
        placeholder='Username'
      />

      <input
        type='password'
        value={props.password}
        onChange={props.handlePasswordChange}
        name='Password'
        placeholder='Password'
      />

      <Button id='form-login-button' type='submit'>
        Login
      </Button>
    </form>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func,
  handlePasswordChange: PropTypes.func,
  handleUsernameChange: PropTypes.func,
  username: PropTypes.string,
  password: PropTypes.string
}

export default LoginForm
