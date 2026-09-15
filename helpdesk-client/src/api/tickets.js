import client from './client'

export async function getTickets() {
  const res = await client.get('/api/tickets')
  return res.data
}

export async function getTicket(id) {
  const res = await client.get(`/api/tickets/${id}`)
  return res.data
}

export async function createTicket(ticket) {
  const res = await client.post('/api/tickets', ticket)
  return res.data
}

export async function updateTicket(id, changes) {
  const res = await client.put(`/api/tickets/${id}`, changes)
  return res.data
}

export async function deleteTicket(id) {
  await client.delete(`/api/tickets/${id}`)
}
