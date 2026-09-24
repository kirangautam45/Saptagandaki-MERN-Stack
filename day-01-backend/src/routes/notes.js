import { Router } from 'express'
import {
  listNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
} from '../controllers/notes.js'

const router = Router()

router.get('/', listNotes)
router.post('/', createNote)
router.get('/:id', getNote)
router.put('/:id', updateNote)
router.delete('/:id', deleteNote)

export default router
