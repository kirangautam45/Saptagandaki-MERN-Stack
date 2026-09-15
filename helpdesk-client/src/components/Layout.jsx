import { Link, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Layout() {
  const { user, logout } = useAuth()

  return (
    <div className="app">
      <header className="topbar">
        <Link to="/" className="brand">Helpdesk</Link>

        <nav>
          <Link to="/">My Tickets</Link>
          <Link to="/tickets/new">New Ticket</Link>
        </nav>

        <span className="muted">{user.name}</span>
        <button onClick={logout}>Log out</button>
      </header>

      <main className="content">
        <Outlet />
      </main>
    </div>
  )
}
