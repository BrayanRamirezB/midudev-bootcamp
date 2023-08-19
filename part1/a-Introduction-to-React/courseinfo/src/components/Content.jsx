import PropTypes from 'prop-types'
import Part from './Part'

const Content = ({ parts }) => {
  return (
    <div>
      <ul>
        {parts.map((part) => (
          <Part key={part.id} part={part} />
        ))}
      </ul>
    </div>
  )
}

Content.propTypes = {
  parts: PropTypes.array,
}

export default Content
