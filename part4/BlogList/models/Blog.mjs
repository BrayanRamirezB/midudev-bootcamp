import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const { Schema, model } = mongoose

const blogSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String },
  url: { type: String, required: true, unique: true },
  likes: { type: Number },
  user: { type: Schema.Types.ObjectId, ref: 'User' }
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

blogSchema.plugin(uniqueValidator)

const Blog = model('Blog', blogSchema)

export default Blog
