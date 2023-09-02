import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import './App.css'

function App() {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [type, setType] = useState(null)

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs))
      .catch((error) => {
        setMessage(error.message)
        setType('error')
        setTimeout(() => {
          setMessage(null)
          setType(null)
        }, 5000)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem('loggedBlogAppUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleUser = async (user) => {
    if (user) {
      setUser(user)
      blogService.setToken(user.token)
    } else {
      setMessage('Wrong credentials')
      setType('error')
      setTimeout(() => {
        setMessage(null)
        setType(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    blogService.setToken(user.token)
    localStorage.removeItem('loggedBlogAppUser')
  }

  const addBlog = (blogToAddState) => {
    blogService
      .createBlog(blogToAddState)
      .then((newBlog) => {
        setBlogs((prevBlogs) => prevBlogs.concat(newBlog))
        setMessage(
          `A new blog ${blogToAddState.title} was added by ${user.username}`
        )
        setType('success')
        setTimeout(() => {
          setMessage(null)
          setType(null)
        }, 5000)
      })
      .catch((error) => {
        setMessage(error.message)
        setType('error')
        setTimeout(() => {
          setMessage(null)
          setType(null)
        }, 5000)
      })
  }

  if (user === null) {
    return (
      <div>
        <h1>Log in to application</h1>
        <Notification message={message} type={type} />
        <LoginForm handleUser={handleUser} />
      </div>
    )
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={message} type={type} />

      <BlogForm
        username={user.username}
        addBlog={addBlog}
        handleClick={handleLogout}
      />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default App
