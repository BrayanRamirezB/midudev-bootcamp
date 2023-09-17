import { BrowserRouter, Link, Route, Routes, Navigate } from 'react-router-dom'
import Notes from './Notes'
import NoteDetail from './components/NoteDetail'
import Login from './Login'
import { useNotes } from './hooks/useNotes'
import { useUser } from './hooks/useUser'
import './App.css'

const Home = () => <h1>Home Page</h1>

const Users = () => <h1>Users</h1>

const inLineStyles = {
  padding: 5
}

const App = () => {
  const { notes } = useNotes()
  const { user, setUser } = useUser()

  return (
    <BrowserRouter>
      <header>
        <Link to={'/'} style={inLineStyles}>
          Home
        </Link>
        <Link to={'/notes'} style={inLineStyles}>
          Notes
        </Link>
        <Link to={'/users'} style={inLineStyles}>
          Users
        </Link>
        {user ? (
          <em>Logged as {user.name}</em>
        ) : (
          <Link to='/login' style={inLineStyles}>
            Login
          </Link>
        )}
      </header>

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
    </BrowserRouter>
  )
}

export default App
