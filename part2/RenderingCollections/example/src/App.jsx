import Notes from './Notes'
import NoteDetail from './components/NoteDetail'
import Login from './Login'
import { BrowserRouter, Link, Route, Routes, Navigate } from 'react-router-dom'
import { useNotes } from './hooks/useNotes'
import { useUser } from './hooks/useUser'

import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

const Home = () => <h1>Home Page</h1>

const Users = () => <h1>Users</h1>

const inLineStyles = {
  padding: 5,
  textDecoration: 'none',
  color: 'white'
}

const App = () => {
  const { notes } = useNotes()
  const { user, setUser } = useUser()

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
                Home
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='responsive-navbar-nav' />
            <Navbar.Collapse id='responsive-navbar-nav'>
              <Nav className='me-auto'>
                <Nav>
                  <Link to={'/notes'} style={inLineStyles}>
                    Notes
                  </Link>
                </Nav>

                <Nav>
                  <Link to={'/users'} style={inLineStyles}>
                    Users
                  </Link>
                </Nav>

                {user ? (
                  <Navbar.Text>Logged as {user.name}</Navbar.Text>
                ) : (
                  <Nav>
                    <Link to='/login' style={inLineStyles}>
                      Login
                    </Link>
                  </Nav>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Routes>
          <Route path='/' element={<Home />} />
          <Route
            path='/users'
            element={user ? <Users /> : <Navigate replace to='/login' />}
          />
          <Route
            path='/notes'
            element={
              <Notes
                onLogin={(user) => setUser(user)}
                onLogout={(user) => setUser(user)}
              />
            }
          />
          <Route path='/notes/:noteId' element={<NoteDetail notes={notes} />} />
          <Route
            path='/login'
            element={
              user ? (
                <Navigate replace to='/' />
              ) : (
                <Login onLogin={(user) => setUser(user)} />
              )
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
