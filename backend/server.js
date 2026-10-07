import express from 'express'
import notesRouter from './src/routes/notes.js'
import notFound from './src/middleware/notFound.js'

process.loadEnvFile()

const app = express()
const PORT = process.env.PORT || 4001

app.use(express.json())

app.get('/', (_req, res) => {
  res.json({ status: 'ok'})
})

app.use('/api/notes', notesRouter)
app.use(notFound)

app.listen(PORT, () => {
  console.log(`Node API running on http://localhost:${PORT}`)
})
