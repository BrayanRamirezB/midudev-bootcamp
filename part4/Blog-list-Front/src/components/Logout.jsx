import { useUser } from '../hooks/useUser'
import PropTypes from 'prop-types'

import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

const Logout = ({ username }) => {
  const { handleLogout } = useUser()

  return (
    <Container>
      {username} logged in
      <Button onClick={handleLogout}>Logout</Button>
    </Container>
  )
}

Logout.propTypes = {
  username: PropTypes.string
}

export default Logout
