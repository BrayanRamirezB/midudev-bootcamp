import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
const { Schema, model } = mongoose

const userSchema = new Schema({
  username: { type: String, required: true, unique: true, minLength: 3 },
  name: String,
  passwordHash: { type: String, required: true, minLength: 3 },
  blogs: [{ type: Schema.Types.ObjectId, ref: 'Blog' }]
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

userSchema.plugin(uniqueValidator)

const User = model('User', userSchema)

export default User
