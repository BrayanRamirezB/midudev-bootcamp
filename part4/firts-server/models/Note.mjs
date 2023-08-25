import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
const { model, Schema } = mongoose

const noteSchema = new Schema({
  content: { type: String, required: true },
  date: { type: Date },
  important: Boolean,
  user: { type: Schema.Types.ObjectId, ref: 'User' }
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
