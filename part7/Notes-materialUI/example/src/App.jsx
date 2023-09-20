import { BrowserRouter, Link, Route, Routes, Navigate } from 'react-router-dom'
import Notes from './Notes'
import NoteDetail from './components/NoteDetail'
import Login from './Login'
import { useNotes } from './hooks/useNotes'
import { useUser } from './hooks/useUser'
import {
  Toolbar,
  Box,
  Button,
  IconButton,
  AppBar,
  Container
} from '@mui/material'

const Home = () => <h1>Home Page</h1>

const Users = () => <h1>Users</h1>

const App = () => {
  const { notes } = useNotes()
  const { user, setUser } = useUser()

  return (
    <BrowserRouter>
      <Container>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position='static'>
            <Toolbar>
              <IconButton edge='start' color='inherit' aria-label='menu'>
                {' '}
              </IconButton>
              <header>
                <Button color='inherit' component={Link} to={'/'}>
                  Home
                </Button>
                <Button color='inherit' component={Link} to={'/notes'}>
                  Notes
                </Button>
                <Button color='inherit' component={Link} to={'/users'}>
                  Users
                </Button>
                {user ? (
                  <em>Logged as {user.name}</em>
                ) : (
                  <Button color='inherit' component={Link} to='/login'>
                    Login
                  </Button>
                )}
              </header>
            </Toolbar>
          </AppBar>
        </Box>

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
                <div>
                  <h1>Login</h1>
                  <Login onLogin={(user) => setUser(user)} />
                </div>
              )
            }
          />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}

export default App
