import PropTypes from 'prop-types'
import Note from './components/Note'
import './App.css'

const App = ({ notes }) => {
  return (
    <>
      <div>
        <h1>Notes</h1>
        <ul>
          {notes.map((note) => (
            <Note key={note.id} note={note} />
          ))}
        </ul>
      </div>
    </>
  )
}

App.propTypes = {
  notes: PropTypes.array,
}

export default App
