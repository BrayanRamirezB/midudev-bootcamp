import PropTypes from 'prop-types'

const ListOfClicks = ({ clicks }) => {
  return <p>{clicks.join(', ')}</p>
}

ListOfClicks.propTypes = {
  clicks: PropTypes.array,
}

export default ListOfClicks
