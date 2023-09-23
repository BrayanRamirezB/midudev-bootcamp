import { useParams } from 'react-router-dom'
import { useBlogs } from '../hooks/useBlogs'
import PropTypes from 'prop-types'

import Container from 'react-bootstrap/Container'
import ListGroup from 'react-bootstrap/ListGroup'

const UserDetail = ({ user }) => {
  const { userId } = useParams()
  const { findUserBlogs } = useBlogs()
  const blogs = findUserBlogs(userId)

  if (!blogs) return null

  return (
    <Container>
      <br />
      <h2 className='text-center'>
        <strong>{user.username}</strong>
      </h2>
      <br />
      <ListGroup>
        <ListGroup.Item active>
          <h3>
            <strong>Added blogs</strong>
          </h3>
        </ListGroup.Item>
        {blogs.map((blog, i) => (
          <ListGroup.Item key={i}>{blog.title}</ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  )
}

UserDetail.propTypes = {
  user: PropTypes.object
}

export default UserDetail
