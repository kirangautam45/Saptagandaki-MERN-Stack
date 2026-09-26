import express from 'express'
import mongoose from 'mongoose'
import { connectDB } from './src/database/db.js'
import Note from './src/models/Note.js'
import notesRouter from './src/routes/notes.js'
import notFound from './src/middleware/notFound.js'

process.loadEnvFile()

const app = express()
const PORT = process.env.PORT || 4009

app.use(express.json())

app.get('/', async (_req, res) => {
  const states = ['disconnected', 'connected', 'connecting', 'disconnecting']
  const { readyState, host, port, name } = mongoose.connection
  res.json({
    status: 'ok',
    database: states[readyState],
    host: `${host}:${port}`,
    name,
    notes: readyState === 1 ? await Note.countDocuments() : null,
  })
})

app.use('/api/notes', notesRouter)
app.use(notFound)

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Node API running on http://localhost:${PORT}`))
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message)
    process.exit(1)
  })
