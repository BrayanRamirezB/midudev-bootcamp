import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const User = ({ user, blogs }) => {
  const inLineStyles = {
    padding: 15,
    textDecoration: 'none',
    color: 'white'
  }

  return (
    <tr>
      <td>
        <Link to={`/users/${user.id}`} style={inLineStyles}>
          {user.username}
        </Link>
      </td>
      <td>{blogs}</td>
    </tr>
  )
}

User.propTypes = {
  user: PropTypes.object,
  blogs: PropTypes.number
}

export default User
