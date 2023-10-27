import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const Schema = mongoose.Schema

const personSchema = new Schema({
  name: { type: String, required: true, unique: true, minlength: 5 },
  phone: { type: String, minlength: 5 },
  city: { type: String, required: true, minlength: 3 },
  street: { type: String, required: true, minlength: 3 }
})

personSchema.plugin(uniqueValidator)

const Person = mongoose.model('Person', personSchema)

export default Person
