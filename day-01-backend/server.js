import express from 'express'
import { notes } from './src/data/notes.js'
import notesRouter from './src/routes/notes.js'
import notFound from './src/middleware/notFound.js'

process.loadEnvFile()

const app = express()
const PORT = process.env.PORT || 4001

app.use(express.json())

app.get('/', (_req, res) => {
  res.json({ status: 'ok', notes: notes.length })
})

app.use('/api/notes', notesRouter)
app.use(notFound)

app.listen(PORT, () => {
  console.log(`Node API running on http://localhost:${PORT}`)
})
