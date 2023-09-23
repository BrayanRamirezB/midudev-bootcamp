import { useBlogs } from '../hooks/useBlogs'
import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'

import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

const BlogDetail = ({ username }) => {
  const { updateBlogLikes, removeBlog, findBlogById } = useBlogs()
  const { blogId } = useParams()
  const blog = findBlogById(blogId)

  if (!blog) return null

  return (
    <Container className='d-flex justify-content-center text-center'>
      <Card style={{ width: '20rem' }}>
        <Card.Body>
          <Card.Title>
            <i>{blog.title}</i>
          </Card.Title>

          <Card.Text>
            {blog.url}
            <br />
            Likes {blog.likes}
            {'  '}
            <Button onClick={() => updateBlogLikes(blogId, username)}>
              like
            </Button>
            <br />
            <strong>
              <i>{blog.author}</i>
            </strong>
          </Card.Text>

          <Button
            id='deleteButton'
            onClick={() => removeBlog(blogId, username)}
          >
            Remove Blog
          </Button>
        </Card.Body>
      </Card>
    </Container>
  )
}

BlogDetail.propTypes = {
  username: PropTypes.string
}

export default BlogDetail
