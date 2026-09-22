import express, { json } from 'express'

const app = express()
const PORT = process.env.PORT || 4000





 app.use(json())

// Our "database".
let notes = [
  { id: 1, title: 'Welcome', body: 'Delete me and see what happens.' },
  {
    id: 2,
    title: 'Restart the server',
    body: 'These notes reset. That is the point.',
  },
]

let nextId = 3

// Health check — confirms the server is up before you touch /api.
app.get('/', (req, res) => {
  res.json({ status: 'ok', notes: notes.length })
})

// Every note.
app.get('/api/notes', (req, res) => {
  res.json(notes)
})

// One note.

app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  const note = notes.find((n) => n.id === id)

  if (!note) {
    return res.status(404).json({ error: `No note with id ${id}` })
  }

  res.json(note)
})

// Create a note.
app.post('/api/notes', (req, res) => {
  const { title, body } = req.body

  if (typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({ error: 'title is required' })
  }

  if (body !== undefined && typeof body !== 'string') {
    return res.status(400).json({ error: 'body must be a string' })
  }

  const note = { id: nextId++, title: title.trim(), body: (body || '').trim() }
  notes.push(note)

  res.status(201).json(note)
})

// Delete a note.
app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  const index = notes.findIndex((n) => n.id === id)

  if (index === -1) {
    return res.status(404).json({ error: `No note with id ${id}` })
  }

  const [deleted] = notes.splice(index, 1)
  res.json({ message: 'Note deleted', note: deleted })
})


// Update a note.
app.put('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  const note = notes.find((n) => n.id === id)

  if (!note) {
    return res.status(404).json({ error: `No note with id ${id}` })
  }

  const { title, body } = req.body

  if (title !== undefined) {
    if (typeof title !== 'string' || !title.trim()) {
      return res.status(400).json({ error: 'title cannot be empty' })
    }
    note.title = title.trim()
  }

  if (body !== undefined) {
    if (typeof body !== 'string') {
      return res.status(400).json({ error: 'body must be a string' })
    }
    note.body = body.trim()
  }

  res.json(note)
})


app.use((req, res) => {
  res.status(404).json({ error: `Cannot ${req.method} ${req.url}` })
})


app.listen(PORT, () => {
  console.log(`Node API running on http://localhost:${PORT}`)
})


