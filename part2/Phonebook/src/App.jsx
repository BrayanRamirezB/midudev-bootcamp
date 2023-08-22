import { useState, useEffect } from 'react'
import {
  getAllPersons,
  deleteIdPerson,
  createPerson,
  updatePerson
} from './services/Persons'
import './App.css'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const INIT_STATE_PERSONS = []
const INIT_STATE_NAME = ''
const INIT_STATE_NUMBER = ''
const INIT_STATE_SHOW = ''
const INIT_STATE_TEXT = null

function App() {
  const [persons, setPersons] = useState(INIT_STATE_PERSONS)
  const [newName, setNewName] = useState(INIT_STATE_NAME)
  const [newNumber, setNewNumber] = useState(INIT_STATE_NUMBER)
  const [show, setShow] = useState(INIT_STATE_SHOW)
  const [textMessage, setMessage] = useState(INIT_STATE_TEXT)

  useEffect(() => {
    getAllPersons()
      .then((persons) => {
        setPersons(persons)
      })
      .catch((e) => {
        alert(e)
      })
  }, [])

  const handleChangeName = (event) => {
    setNewName(event.target.value)
  }

  const handleChangeNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNewPerson = (event) => {
    event.preventDefault()
    const stateToPerson = {
      id: Math.floor(Math.random() * 10000000),
      name: newName,
      number: newNumber
    }

    if (validatePersonName(newName)) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const people = persons.find((p) => p.name === newName)

        const stateToPerson = {
          id: people.id,
          name: people.name,
          number: newNumber
        }

        updatePerson(people.id, stateToPerson)
          .then(() => {
            getAllPersons()
              .then((persons) => {
                setPersons(persons)
                setMessage(`Update ${stateToPerson.name}`)
                setTimeout(() => {
                  setMessage(null)
                }, 5000)
              })
              .catch((e) => {
                alert(e)
              })
          })
          .catch((e) => {
            alert(e)
          })
      }
    } else if (validatePersonNumber(stateToPerson.number))
      alert(`${newNumber} is already added to phonebook`)
    else {
      createPerson(stateToPerson)
        .then((newPerson) => {
          setPersons((prevPersons) => prevPersons.concat(newPerson))
          setMessage(`Add ${stateToPerson.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch((e) => {
          alert(e)
        })
    }

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

  const deletePerson = (id) => {
    deleteIdPerson(id)
      .then(() => {
        getAllPersons()
          .then((persons) => {
            setPersons(persons)
          })
          .catch((e) => {
            alert(e)
          })
      })
      .catch((e) => {
        alert(e)
      })
  }

  return (
    <>
      <div>
        <h1>Phonebook</h1>
        <Notification message={textMessage} />
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
        <Persons persons={persons} show={show} deletePerson={deletePerson} />
      </div>
    </>
  )
}

export default App
