import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
const { Schema, model } = mongoose

const userSchema = new Schema({
  username: { type: String, unique: true },
  name: String,
  passwordHash: String,
  notes: [{ type: Schema.Types.ObjectId, ref: 'Note' }]
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v

    delete returnedObject.passwordHash
  }
})

userSchema.plugin(uniqueValidator)

const User = model('User', userSchema)

export default User