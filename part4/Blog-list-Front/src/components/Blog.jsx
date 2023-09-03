import Togglable from './Togglable'
import PropTypes from 'prop-types'
import './Blog.css'

const Blog = ({ blog, updateBlogLikes, deleteBlog }) => {
  return (
    <div id='blogContainer'>
      <i>{blog.title}</i> written by <strong> {blog.author}</strong>
      <Togglable buttonLabel='View'>
        {blog.url}
        <br />
        Likes {blog.likes}
        <button onClick={updateBlogLikes}>like</button>
        <br />
        <strong>
          <i>{blog.author}</i>
        </strong>
        <br />
        <button id='deleteButton' onClick={deleteBlog}>
          Remove Blog
        </button>
      </Togglable>
    </div>
  )
}
Blog.propTypes = {
  blog: PropTypes.object,
  updateBlogLikes: PropTypes.func,
  deleteBlog: PropTypes.func
}

export default Blog
