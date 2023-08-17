import PropTypes from 'prop-types'

const Header = (props) => <h1>{props.course}</h1>

Header.propTypes = {
  course: PropTypes.string,
}

export default Header
