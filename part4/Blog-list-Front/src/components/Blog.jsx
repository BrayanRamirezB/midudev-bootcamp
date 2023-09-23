import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'

const Blog = ({ blog }) => {
  return (
    <Col>
      <Card
        style={{ width: '18rem', background: '#8E2DE2', color: 'white' }}
        className='text-center'
      >
        <Card.Body>
          <Card.Title>
            <Link
              to={`/${blog.id}`}
              style={{ textDecoration: 'none', color: 'white' }}
            >
              <i>{blog.title} </i>
            </Link>
          </Card.Title>
          <Card.Text>
            written by <strong> {blog.author}</strong>
          </Card.Text>
        </Card.Body>
      </Card>
      <br />
    </Col>
  )
}
Blog.propTypes = {
  blog: PropTypes.object
}

export default Blog
