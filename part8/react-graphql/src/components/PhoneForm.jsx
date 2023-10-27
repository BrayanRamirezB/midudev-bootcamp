import { useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'
import { EDIT_NUMBER } from '../persons/graphql-mutations'
import PropTypes from 'prop-types'

const PhoneForm = ({ notifyError }) => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  const [changeNumber, result] = useMutation(EDIT_NUMBER)

  useEffect(() => {
    if (result.data && result.data.editNumber === null) {
      notifyError('Person not Found')
    }
  }, [result.data, notifyError])

  const handleSubmit = (event) => {
    event.preventDefault()

    changeNumber({ variables: { name, phone } })

    setName('')
    setPhone('')
  }

  return (
    <div>
      <h1>Edit Phone Number</h1>
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

        <button type='submit'>Change Phone</button>
      </form>
    </div>
  )
}

PhoneForm.propTypes = {
  notifyError: PropTypes.func
}

export default PhoneForm
