import PropTypes from 'prop-types'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const LoginForm = ({ handleSubmit, ...props }) => {
  return (
    <Form data-test-id='login-form' onSubmit={handleSubmit}>
      <br />
      <Container>
        <Row className='align-items-center'>
          <Col xs={5}>
            <Form.Group id='username'>
              <FloatingLabel id='floatingUsername' label='Username'>
                <Form.Control
                  size='sm'
                  type='text'
                  value={props.username}
                  onChange={props.handleUsernameChange}
                  name='Username'
                  placeholder='Username'
                />
              </FloatingLabel>
            </Form.Group>
          </Col>
          <Col xs={5}>
            <Form.Group id='password'>
              <FloatingLabel id='floatingPassword' label='Password'>
                <Form.Control
                  size='sm'
                  type='password'
                  value={props.password}
                  onChange={props.handlePasswordChange}
                  name='Password'
                  placeholder='Password'
                />
              </FloatingLabel>
            </Form.Group>
          </Col>
          <Col>
            <Button id='form-login-button' type='submit' variant='primary'>
              Login
            </Button>
          </Col>
        </Row>
      </Container>
      <br />
    </Form>
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
