import mongoose from 'mongoose'
import Note from '../models/Note.js'

const fail = (res, err) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    return res.status(400).json({ error: err.message })
  }
  res.status(500).json({ error: 'Something went wrong' })
}

const checkId = (req, res) => {
  if (mongoose.isValidObjectId(req.params.id)) return true
  res.status(400).json({ error: `Invalid id ${req.params.id}` })
}

const notFound = (req, res) => res.status(404).json({ error: `No note with id ${req.params.id}` })

export const listNotes = async (req, res) => {
  try {
    res.json(await Note.find().sort({ createdAt: -1 }))
  } catch (err) {
    fail(res, err)
  }
}

export const getNote = async (req, res) => {
  if (!checkId(req, res)) return
  try {
    const note = await Note.findById(req.params.id)
    note ? res.json(note) : notFound(req, res)
  } catch (err) {
    fail(res, err)
  }
}

export const createNote = async (req, res) => {
  try {
    const { title, body } = req.body
    res.status(201).json(await Note.create({ title, body }))
  } catch (err) {
    fail(res, err)
  }
}

export const updateNote = async (req, res) => {
  if (!checkId(req, res)) return
  try {
    const { title, body } = req.body
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { title, body },
      { new: true, runValidators: true }
    )
    note ? res.json(note) : notFound(req, res)
  } catch (err) {
    fail(res, err)
  }
}

export const deleteNote = async (req, res) => {
  if (!checkId(req, res)) return
  try {
    const note = await Note.findByIdAndDelete(req.params.id)
    note ? res.json({ message: 'Note deleted' }) : notFound(req, res)
  } catch (err) {
    fail(res, err)
  }
}
