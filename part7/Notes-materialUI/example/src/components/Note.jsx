import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import TableCell from '@mui/material/TableCell'
import Button from '@mui/material/Button'

const Note = ({ note, toggleImportance }) => {
  const label = note.important ? 'make not important' : 'make important'

  return (
    <>
      <TableCell className='note'>
        <Link to={`/notes/${note.id}`}>
          Content: <small>{note.content}</small> <br />
        </Link>
      </TableCell>
      <TableCell>
        <p>
          Date: <small>{note.date}</small>
        </p>
      </TableCell>
      <TableCell>
        <Button variant='outlined' color='secondary' onClick={toggleImportance}>
          {label}
        </Button>
      </TableCell>
    </>
  )
}

Note.propTypes = {
  note: PropTypes.object,
  toggleImportance: PropTypes.func
}

export default Note
