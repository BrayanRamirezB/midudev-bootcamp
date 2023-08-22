import express, { json } from 'express'

const app = express()
app.use(express.json())

let persons = [
  { id: 1, name: 'Arto Hellas', number: '040-123456' },
  { id: 2, name: 'Ada Lovelace', number: '39-44-5323523' },
  { id: 3, name: 'Dan Abramov', number: '12-43-234345' },
  { id: 4, name: 'Mary Poppendieck', number: '39-23-6423122' },
]

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/info', (req, res) => {
  const people = persons.map((person) => person.id)
  const date = new Date().toString()
  res.send(`<p>Phonebook has info for ${people} people</p> <p>${date}</p>`)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)

  const people = persons.find((person) => person.id === id)

  if (people) res.send(people)
  else res.status(404).end()
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)

  persons = persons.filter((person) => person.id !== id)

  res.status(204).end()
})

app.post('/api/persons', (req, res) => {
  const people = req.body

  if (!people || !people.name || !people.number)
    return res.status(400).json({ error: 'name or number is missing' })

  const peopleExists = persons.find((person) => person.name === people.name)

  if (peopleExists)
    return res.status(400).json({ error: 'name must be unique' })

  const newPerson = {
    id: Math.floor(Math.random() * 1000000),
    name: people.name,
    number: people.number,
  }

  persons = [...persons, newPerson]

  res.status(201).json(newPerson)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/api/persons`)
})
