import PropTypes from 'prop-types'
import { useState, forwardRef, useImperativeHandle } from 'react'

import Button from '@mui/material/Button'

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
    <div>
      <div style={hideWhenVisible}>
        <Button variant='contained' color='primary' onClick={toggleVisibility}>
          {buttonLabel}
        </Button>
      </div>

      <div style={showWhenVisible}>
        {children}
        <Button
          variant='contained'
          color='secondary'
          onClick={toggleVisibility}
        >
          Cancel
        </Button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  children: PropTypes.node,
  buttonLabel: PropTypes.string
}

export default Togglable
