import mongoose from 'mongoose'

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, 'title is required'], trim: true },
    body: { type: String, default: '', trim: true },
  },
  { timestamps: true }
)

export default mongoose.model('Note', noteSchema)
