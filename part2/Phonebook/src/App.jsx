import { useState } from 'react'
import './App.css'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const INIT_STATE_PERSONS = [
  { name: 'Arto Hellas', number: '040-123456' },
  { name: 'Ada Lovelace', number: '39-44-5323523' },
  { name: 'Dan Abramov', number: '12-43-234345' },
  { name: 'Mary Poppendieck', number: '39-23-6423122' },
]
const INIT_STATE_NAME = ''
const INIT_STATE_NUMBER = ''
const INIT_STATE_SHOW = ''

function App() {
  const [persons, setPersons] = useState(INIT_STATE_PERSONS)
  const [newName, setNewName] = useState(INIT_STATE_NAME)
  const [newNumber, setNewNumber] = useState(INIT_STATE_NUMBER)
  const [show, setShow] = useState(INIT_STATE_SHOW)

  const handleChangeName = (event) => {
    setNewName(event.target.value)
  }

  const handleChangeNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNewPerson = (event) => {
    event.preventDefault()
    const stateToPerson = {
      name: newName,
      number: newNumber,
    }

    if (validatePersonName(stateToPerson.name))
      alert(`${newName} is already added to phonebook`)
    else if (validatePersonNumber(stateToPerson.number))
      alert(`${newNumber} is already added to phonebook`)
    else setPersons((prevPersons) => prevPersons.concat(stateToPerson))

    setNewName('')
    setNewNumber('')
  }

  const validatePersonName = (data) => {
    return persons.find((person) => person.name === data)
  }

  const validatePersonNumber = (data) => {
    return persons.find((person) => person.number === data)
  }

  const handleShow = (event) => {
    setShow(event.target.value)
  }

  return (
    <>
      <div>
        <h1>Phonebook</h1>
        <Filter value={show} onChange={handleShow} />
        <h1>Add a new</h1>
        <PersonForm
          onSubmit={handleNewPerson}
          nameValue={newName}
          nameChange={handleChangeName}
          numberValue={newNumber}
          numberChange={handleChangeNumber}
        />
        <h1>Numbers</h1>
        <Persons persons={persons} show={show} />
      </div>
    </>
  )
}

export default App
