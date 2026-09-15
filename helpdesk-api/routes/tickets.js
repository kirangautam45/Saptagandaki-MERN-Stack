import express from 'express'

import protect from '../middleware/auth.js'
import {
  getTickets,
  createTicket,
  getTicket,
  updateTicket,
  deleteTicket,
} from '../controllers/ticketController.js'

const router = express.Router()

// Every ticket route needs a logged-in user
router.use(protect)

router.route('/').get(getTickets).post(createTicket)
router.route('/:id').get(getTicket).put(updateTicket).delete(deleteTicket)

export default router
