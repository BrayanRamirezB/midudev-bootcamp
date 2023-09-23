import BlogForm from './BlogForm'
import Blog from './Blog'
import { useBlogs } from '../hooks/useBlogs'
import PropTypes from 'prop-types'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const Blogs = ({ username }) => {
  const { sortenedBlogs } = useBlogs()

  return (
    <Container>
      <Row className='text-center'>
        <Col>
          <h1>Blogs</h1>
        </Col>
      </Row>

      <Row>
        <Col>
          <BlogForm username={username} />
          <br />
        </Col>
      </Row>
      <Row>
        {sortenedBlogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </Row>
    </Container>
  )
}

Blogs.propTypes = {
  username: PropTypes.string
}

export default Blogs
