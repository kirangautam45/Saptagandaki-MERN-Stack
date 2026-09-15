import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createTicket } from '../api/tickets'

export default function CreateTicket() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ title: '', description: '' })
  const [error, setError] = useState('')

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      await createTicket(form)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Could not create ticket')
    }
  }

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1>New ticket</h1>
        {error && <p className="error">{error}</p>}

        <label>
          Title
          <input name="title" value={form.title} onChange={handleChange} required />
        </label>

        <label>
          Description
          <textarea name="description" rows={5} value={form.description} onChange={handleChange} required />
        </label>

        <button type="submit">Submit ticket</button>
      </form>
    </div>
  )
}
