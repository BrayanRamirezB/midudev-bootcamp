import Togglable from './Togglable'
import { useRef, useState } from 'react'
import { useBlogs } from '../hooks/useBlogs'
import PropTypes from 'prop-types'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

const BlogForm = ({ username }) => {
  const { addBlog } = useBlogs()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const togglableRef = useRef()

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const blogToAddState = {
        title: title,
        author: author,
        url: url
      }
      addBlog(blogToAddState, username)
      setTitle('')
      setAuthor('')
      setUrl('')
      togglableRef.current.toggleVisibility()
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Container>
      <Togglable buttonLabel={'Add new Blog'} ref={togglableRef}>
        <h2>Create a new Blog</h2>
        <div id='Blogform'>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Blog title</Form.Label>
                  <Form.Control
                    type='text'
                    value={title}
                    placeholder='Write your blog title'
                    onChange={({ target }) => setTitle(target.value)}
                  />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group>
                  <Form.Label>Blog author</Form.Label>
                  <Form.Control
                    type='text'
                    value={author}
                    placeholder='Write your blog author'
                    onChange={({ target }) => setAuthor(target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Blog URL</Form.Label>
                  <Form.Control
                    type='text'
                    value={url}
                    placeholder='Write your blog URL'
                    onChange={({ target }) => setUrl(target.value)}
                  />
                </Form.Group>
              </Col>

              <Col className='text-center'>
                <br />
                <Button type='submit'>Save</Button>
              </Col>
            </Row>
          </Form>
        </div>
        <br />
      </Togglable>
    </Container>
  )
}

BlogForm.propTypes = {
  username: PropTypes.string
}

export default BlogForm
