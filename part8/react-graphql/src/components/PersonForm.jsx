import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { ALL_PERSONS } from '../persons/graphql-queries'
import { CREATE_PERSON } from '../persons/graphql-mutations'
import PropTypes from 'prop-types'

const PersonForm = ({ notifyError }) => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')

  const [createPerson] = useMutation(CREATE_PERSON, {
    //refetchQueries: [{ query: ALL_PERSONS }],
    onError: (error) => {
      notifyError(error.graphQLErrors[0].message)
    },
    update: (store, response) => {
      const dataInStore = store.readQuery({ query: ALL_PERSONS })
      store.writeQuery({
        query: ALL_PERSONS,
        data: {
          ...dataInStore,
          allPersons: [...dataInStore.allPersons, response.data.addPerson]
        }
      })
    }
  })

  const handleSubmit = (event) => {
    event.preventDefault()

    createPerson({ variables: { name, phone, street, city } })

    setName('')
    setPhone('')
    setStreet('')
    setCity('')
  }

  return (
    <div>
      <h1>Create a new Person</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={name}
          placeholder='name'
          onChange={(evt) => setName(evt.target.value)}
        />
        <input
          value={phone}
          placeholder='phone'
          onChange={(evt) => setPhone(evt.target.value)}
        />
        <input
          value={street}
          placeholder='street'
          onChange={(evt) => setStreet(evt.target.value)}
        />
        <input
          value={city}
          placeholder='city'
          onChange={(evt) => setCity(evt.target.value)}
        />
        <button type='submit'>Add person</button>
      </form>
    </div>
  )
}

PersonForm.propTypes = {
  notifyError: PropTypes.func
}

export default PersonForm
