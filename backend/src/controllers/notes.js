import { notes, newId } from '../data/notes.js'

const findNote = (req, res) => {
  const id = Number(req.params.id)
  const note = notes.find((n) => n.id === id)
  if (!note) res.status(404).json({ error: `No note with id ${id}` })
  return note
}

export const listNotes = (req, res) => {
  res.json(notes)
}

export const getNote = (req, res) => {
  const note = findNote(req, res)
  if (note) res.json(note)
}

export const createNote = (req, res) => {
  const { title, body } = req.body

  if (typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({ error: 'title is required' })
  }
  if (body !== undefined && typeof body !== 'string') {
    return res.status(400).json({ error: 'body must be a string' })
  }

  const note = { id: newId(), title: title.trim(), body: (body || '').trim() }
  notes.push(note)
  res.status(201).json(note)
}

export const updateNote = (req, res) => {
  const note = findNote(req, res)
  if (!note) return

  const { title, body } = req.body

  if (title !== undefined && (typeof title !== 'string' || !title.trim())) {
    return res.status(400).json({ error: 'title cannot be empty' })
  }
  if (body !== undefined && typeof body !== 'string') {
    return res.status(400).json({ error: 'body must be a string' })
  }

  if (title !== undefined) note.title = title.trim()
  if (body !== undefined) note.body = body.trim()
  res.json(note)
}

export const deleteNote = (req, res) => {
  const note = findNote(req, res)
  if (!note) return

  notes.splice(notes.indexOf(note), 1)
  res.json({ message: 'Note deleted', note })
}
