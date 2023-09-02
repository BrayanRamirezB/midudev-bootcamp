import { useState } from 'react'
import PropTypes from 'prop-types'
import './BlogForm.css'

const BlogForm = ({ addBlog, handleClick, username }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const blogToAddState = {
        title: title,
        author: author,
        url: url
      }
      addBlog(blogToAddState)
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div>
      <div id='Logout'>
        <p>
          <strong>
            <i>{username} logged in</i>
          </strong>
        </p>
        <button onClick={handleClick}>Logout</button>
      </div>
      <h2>Create a new Blog</h2>
      <div id='Blogform'>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            value={title}
            placeholder='Write your blog title'
            onChange={({ target }) => setTitle(target.value)}
          />
          <input
            type='text'
            value={author}
            placeholder='Write your blog author'
            onChange={({ target }) => setAuthor(target.value)}
          />
          <input
            type='text'
            value={url}
            placeholder='Write your blog URL'
            onChange={({ target }) => setUrl(target.value)}
          />
          <button type='submit'>Save</button>
        </form>
      </div>
    </div>
  )
}

BlogForm.propTypes = {
  username: PropTypes.string,
  addBlog: PropTypes.func,
  handleClick: PropTypes.func
}

export default BlogForm
