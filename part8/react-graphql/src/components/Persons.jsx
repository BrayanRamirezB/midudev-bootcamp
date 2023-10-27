import { usePersons } from '../hooks/customHooks'

const Persons = () => {
  const { loading, error, data } = usePersons()

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div>
      {data.allPersons.map((person) => (
        <div key={person.id}>
          {person.name} {person.phone}
        </div>
      ))}
    </div>
  )
}

export default Persons
