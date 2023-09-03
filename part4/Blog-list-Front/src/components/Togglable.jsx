import PropTypes from 'prop-types'
import { useState, forwardRef, useImperativeHandle } from 'react'
import './Togglable.css'

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
        <button className='togglableBtn' onClick={toggleVisibility}>
          {buttonLabel}
        </button>
      </div>

      <div style={showWhenVisible}>
        {children}
        <button className='togglableBtn' onClick={toggleVisibility}>
          Cancel
        </button>
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
