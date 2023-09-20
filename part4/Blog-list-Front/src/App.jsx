import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getInitBlogs,
  addNewBlog,
  deleteOneBlog,
  updateOneBlogLikes
} from './reducers/blogSlice'
import { setSavedUser, resetUser } from './reducers/userSlice'
import './App.css'

function App() {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.users)

  useEffect(() => {
    dispatch(getInitBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem('loggedBlogAppUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setSavedUser(user))
    }
  }, [dispatch])

  const handleLogout = () => {
    dispatch(resetUser())
  }

  const addBlog = (blogToAddState) => {
    dispatch(addNewBlog(blogToAddState, user.username))
  }

  const updateBlogLikes = (id) => {
    dispatch(updateOneBlogLikes(id, user.username))
  }

  const removeBlog = (id) => {
    dispatch(deleteOneBlog(id, user.username))
  }

  const sortenedBlogs = blogs.slice().sort((a, b) => b.likes - a.likes)

  if (user.username === null) {
    return (
      <div>
        <h1>Log in to application</h1>
        <Notification />
        <LoginForm />
      </div>
    )
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification />

      <BlogForm
        username={user.username}
        addBlog={addBlog}
        handleClick={handleLogout}
      />
      {sortenedBlogs.map((blog) => (
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
