import PropTypes from 'prop-types'
import Part from './Part'

const Content = (props) => {
  return (
    <div>
      <Part part={props.parts[0]} />
      <Part part={props.parts[1]} />
      <Part part={props.parts[2]} />
    </div>
  )
}

Content.propTypes = {
  parts: PropTypes.array,
}

export default Content
