import PropTypes from 'prop-types'
import { useState } from 'react'

function Togglable({ children, buttonLabel }) {
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={() => setVisible(true)}>{buttonLabel}</button>
      </div>

      <div style={showWhenVisible}>
        {children}
        <button onClick={() => setVisible(false)}>Cancel</button>
      </div>
    </div>
  )
}

Togglable.propTypes = {
  children: PropTypes.node,
  buttonLabel: PropTypes.string
}

export default Togglable
