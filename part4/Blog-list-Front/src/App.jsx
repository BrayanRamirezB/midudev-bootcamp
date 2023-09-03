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

  const updateBlogLikes = (id) => {
    const blog = blogs.find((b) => b.id === id)
    const changedBlogLikes = { likes: blog.likes + 1 }

    blogService
      .updateLikes(id, changedBlogLikes)
      .then((returnedBlog) => {
        setBlogs((prevBlogs) =>
          prevBlogs.map((blog) => (blog.id !== id ? blog : returnedBlog))
        )
        setMessage(`${blog.title} received a like from ${user.username}`)
        setType('success')
        setTimeout(() => {
          setMessage(null)
          setType(null)
        }, 5000)
      })
      .catch(() => {
        setMessage('Something went wrong')
        setType('error')
        setTimeout(() => {
          setMessage(null)
          setType(null)
        }, 5000)
      })
  }

  const removeBlog = (id) => {
    const blog = blogs.find((b) => b.id === id)

    blogService
      .deleteBlog(id)
      .then(() => {
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id))
        setMessage(`${blog.title} was removed from ${user.username}`)
        setType('success')
        setTimeout(() => {
          setMessage(null)
          setType(null)
        }, 5000)
      })
      .catch((response) => {
        setMessage(response.response.data.error)
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
      {blogs
        .sort(function (a, b) {
          if (a.likes > b.likes) return -1
          if (a.likes < b.likes) return 1
          return 0
        })
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            updateBlogLikes={() => updateBlogLikes(blog.id)}
            deleteBlog={() => removeBlog(blog.id)}
          />
        ))}
    </div>
  )
}

export default App
