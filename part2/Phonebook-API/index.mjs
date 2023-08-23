import 'dotenv/config'
import './db/mongo.mjs'

import Person from './models/Person.mjs'
import express from 'express'
import cors from 'cors'
import logger from './middleware/loggerMiddleware.mjs'
import NotFound from './middleware/NotFound.mjs'
import handleErrors from './middleware/handleErrors.mjs'

const app = express()

app.use(cors())
app.use(express.json())
app.use(logger)

app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then((persons) => {
      res.json(persons)
    })
    .catch(next)
})

app.get('/info', (req, res, next) => {
  Person.find({})
    .then((persons) => {
      const date = new Date().toString()

      res.send(
        `<p>Phonebook has info for ${persons.length} people</p> <p>${date}</p>`
      )
    })
    .catch(next)
})

app.get('/api/persons/:id', (req, res, next) => {
  const { id } = req.params

  Person.findById(id)
    .then((person) => {
      if (person) res.json(person)
      else res.status(404).end()
    })
    .catch(next)
})

app.delete('/api/persons/:id', (req, res, next) => {
  const { id } = req.params

  Person.findByIdAndRemove(id)
    .then(() => {
      res.status(204).end()
    })
    .catch((error) => next(error))
})

app.post('/api/persons', (req, res, next) => {
  const people = req.body

  if (!people || !people.name || !people.number) {
    return res.status(400).json({ error: 'name or number is missing' }).end()
  }

  Person.find({ name: people.name })
    .then((person) => {
      if (person.length !== 0) {
        res.status(400).json({ error: 'name must be unique' })
      } else {
        const newPerson = new Person({
          name: people.name,
          number: people.number
        })

        newPerson
          .save()
          .then((savedPerson) => {
            res.status(201).json(savedPerson)
          })
          .catch((error) => next(error))
      }
    })
    .catch((error) => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const { id } = req.params
  const person = req.body

  if (!person) return res.status(400).json({ error: 'Person data is missing' })

  const newPersonInfo = {
    number: person.number
  }

  Person.findByIdAndUpdate(id, newPersonInfo, { new: true })
    .then((result) => {
      res.status(200).json(result)
    })
    .catch((error) => {
      next(error)
    })
})

app.use(NotFound)

app.use(handleErrors)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on  http://localhost:${PORT}/api/persons`)
})
