import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getTicket, updateTicket, deleteTicket } from '../api/tickets'

export default function TicketDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [ticket, setTicket] = useState(null)

  useEffect(() => {
    getTicket(id).then(setTicket)
  }, [id])

  async function handleStatus(e) {
    setTicket(await updateTicket(id, { status: e.target.value }))
  }

  async function handleDelete() {
    await deleteTicket(id)
    navigate('/')
  }

  if (!ticket) return <p className="muted">Loading...</p>

  return (
    <div>
      <h1>{ticket.title}</h1>
      <p className="muted">Created {new Date(ticket.createdAt).toLocaleString()}</p>
      <p>{ticket.description}</p>

      <div className="actions">
        <select value={ticket.status} onChange={handleStatus}>
          <option>Open</option>
          <option>In Progress</option>
          <option>Closed</option>
        </select>
        <button className="btn-danger" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  )
}
