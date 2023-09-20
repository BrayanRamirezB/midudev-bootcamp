import { useState, useRef } from 'react'
import Togglable from './Togglable'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const NotesForm = ({ addNote, handleClick }) => {
  const [newNote, setNewNote] = useState('')
  const togglableRef = useRef()

  const handleChange = (event) => {
    setNewNote(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const noteToAddState = {
      content: newNote,
      important: false
    }

    addNote(noteToAddState)
    setNewNote('')
    togglableRef.current.toggleVisibility()
  }

  return (
    <>
      <Togglable buttonLabel='New Note' ref={togglableRef}>
        <Form onSubmit={handleSubmit}>
          <Container>
            <Row>
              <h3>Create a new note</h3>
            </Row>
            <Row>
              <Col xs={7}>
                <Form.Group id='noteContent'>
                  <FloatingLabel id='floatingContent' label='Note Content'>
                    <Form.Control
                      size='sm'
                      type='text'
                      value={newNote}
                      placeholder='Write yor note content :)'
                      onChange={handleChange}
                    />
                  </FloatingLabel>
                </Form.Group>
              </Col>
              <Col xs='auto'>
                <Button size='lg' variant='success' type='submit'>
                  Save
                </Button>
              </Col>
            </Row>
          </Container>
        </Form>
        <br />
        <Button variant='danger' onClick={handleClick}>
          Logout
        </Button>{' '}
      </Togglable>
      <br />
    </>
  )
}

NotesForm.propTypes = {
  handleClick: PropTypes.func,
  addNote: PropTypes.func
}

export default NotesForm
