import PropTypes from 'prop-types'

const CommentaryBtn = (props) => {
  return <button onClick={props.handler}>{props.text}</button>
}

CommentaryBtn.propTypes = {
  text: PropTypes.string,
  handler: PropTypes.func,
}

export default CommentaryBtn
