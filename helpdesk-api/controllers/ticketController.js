import Ticket from '../models/Ticket.js'

export async function getTickets(req, res) {
  const tickets = await Ticket.find({ user: req.userId }).sort({ createdAt: -1 })
  res.json(tickets)
}

export async function createTicket(req, res) {
  try {
    const { title, description } = req.body
    const ticket = await Ticket.create({ title, description, user: req.userId })
    res.status(201).json(ticket)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

export async function getTicket(req, res) {
  try {
    const ticket = await Ticket.findOne({ _id: req.params.id, user: req.userId })
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' })
    res.json(ticket)
  } catch {
    res.status(404).json({ message: 'Ticket not found' })
  }
}

export async function updateTicket(req, res) {
  try {
    const { title, description, status } = req.body
    const ticket = await Ticket.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      { title, description, status },
      { new: true, runValidators: true },
    )
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' })
    res.json(ticket)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

export async function deleteTicket(req, res) {
  try {
    const ticket = await Ticket.findOneAndDelete({ _id: req.params.id, user: req.userId })
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' })
    res.json({ message: 'Ticket deleted' })
  } catch {
    res.status(404).json({ message: 'Ticket not found' })
  }
}
