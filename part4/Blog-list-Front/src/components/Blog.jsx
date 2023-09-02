import PropTypes from 'prop-types'

const Blog = ({ blog }) => (
  <div>
    <i>{blog.title}</i> written by <strong> {blog.author}</strong>
  </div>
)

Blog.propTypes = {
  blog: PropTypes.object
}

export default Blog
