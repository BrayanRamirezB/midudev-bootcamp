import PropTypes from 'prop-types'
import { useState, forwardRef, useImperativeHandle } from 'react'

import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

const Togglable = forwardRef(({ children, buttonLabel }, ref) => {
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => setVisible(!visible)

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <Container>
      <div style={hideWhenVisible}>
        <Container className='d-flex justify-content-center'>
          <Button onClick={toggleVisibility}>{buttonLabel}</Button>
        </Container>
      </div>

      <div style={showWhenVisible}>
        {children}
        <Button onClick={toggleVisibility}>Cancel</Button>
      </div>
    </Container>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  children: PropTypes.node,
  buttonLabel: PropTypes.string
}

export default Togglable
