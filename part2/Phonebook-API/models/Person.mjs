import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
const { model, Schema } = mongoose

const personSchema = new Schema({
  name: { type: String, unique: true },
  number: String
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

personSchema.plugin(uniqueValidator)

const Person = model('Person', personSchema)

export default Person
