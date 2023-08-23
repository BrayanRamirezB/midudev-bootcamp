import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
const { model, Schema } = mongoose

const noteSchema = new Schema({
  content: { type: String, require: true },
  date: { type: Date, require: true },
  important: Boolean
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

noteSchema.plugin(uniqueValidator)

const Note = model('Note', noteSchema)

export default Note
