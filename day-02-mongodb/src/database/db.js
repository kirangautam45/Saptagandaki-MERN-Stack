import mongoose from 'mongoose'

export const connectDB = async () => {
  const { connection } = await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000 })
  const {  name } = connection
  console.log(`MongoDB connected: ${name}`)
}
