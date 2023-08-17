import PropTypes from 'prop-types'

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

Part.propTypes = {
  part: PropTypes.object,
}

export default Part
