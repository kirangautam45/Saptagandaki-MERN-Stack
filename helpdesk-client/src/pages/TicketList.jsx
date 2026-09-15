import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getTickets } from '../api/tickets'

export default function TicketList() {
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getTickets()
      .then(setTickets)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p className="muted">Loading...</p>

  return (
    <div>
      <h1>My Tickets</h1>

      {tickets.length === 0 ? (
        <p className="muted">No tickets yet. <Link to="/tickets/new">Create one</Link></p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((t) => (
              <tr key={t._id}>
                <td><Link to={`/tickets/${t._id}`}>{t.title}</Link></td>
                <td>{t.status}</td>
                <td>{new Date(t.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
