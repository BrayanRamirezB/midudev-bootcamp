import PropTypes from 'prop-types'
import Button from '@mui/material/Button'
import { FormControl, TextField, Container } from '@mui/material'

const LoginForm = ({ handleSubmit, ...props }) => {
  return (
    <form data-test-id='login-form' onSubmit={handleSubmit}>
      <FormControl>
        <Container>
          <TextField
            size='small'
            variant='outlined'
            type='text'
            value={props.username}
            onChange={props.handleUsernameChange}
            name='Username'
            label='Username'
          />
          <TextField
            size='small'
            variant='outlined'
            type='password'
            value={props.password}
            onChange={props.handlePasswordChange}
            name='Password'
            label='Password'
          />{' '}
          <Button
            variant='contained'
            color='success'
            id='form-login-button'
            type='submit'
          >
            Login
          </Button>
        </Container>
      </FormControl>
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
