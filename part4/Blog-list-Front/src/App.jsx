import Blogs from './components/Blogs'
import Login from './components/Login'
import Users from './components/Users'
import Notification from './components/Notification'
import UserDetail from './components/UserDetail'
import BlogDetail from './components/BlogDetail'
import Logout from './components/Logout'
import { useUser } from './hooks/useUser'
import { BrowserRouter, Link, Route, Routes, Navigate } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

function App() {
  const { user } = useUser()

  const inLineStyles = {
    padding: 15,
    textDecoration: 'none',
    color: 'white'
  }

  return (
    <BrowserRouter>
      <div className='container'>
        <Navbar
          collapseOnSelect
          expand='lg'
          bg='primary'
          data-bs-theme='dark'
          sticky='top'
        >
          <Container>
            <Navbar.Brand>
              <Link to={'/'} style={inLineStyles}>
                Blogs
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='responsive-navbar-nav' />
            <Navbar.Collapse id='responsive-navbar-nav'>
              <Nav className='me-auto'>
                <Nav>
                  <Link to={'/users'} style={inLineStyles}>
                    Users
                  </Link>
                </Nav>

                <Nav>
                  {user.username ? (
                    <Navbar.Text>
                      <Logout username={user.username} />{' '}
                    </Navbar.Text>
                  ) : (
                    <Nav>
                      <Link to={'/login'} style={inLineStyles}>
                        Login
                      </Link>
                    </Nav>
                  )}
                </Nav>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Notification />
        <br />

        <Routes>
          <Route
            path='/'
            element={
              user.username ? (
                <Blogs username={user.username} />
              ) : (
                <Navigate replace to='/login' />
              )
            }
          />
          <Route
            path='/users'
            element={
              user.username ? <Users /> : <Navigate replace to='/login' />
            }
          />
          <Route
            path='/login'
            element={user.username ? <Navigate replace to='/' /> : <Login />}
          />
          <Route path='/users/:userId' element={<UserDetail user={user} />} />
          <Route
            path='/:blogId'
            element={<BlogDetail username={user.username} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
