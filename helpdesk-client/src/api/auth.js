import client from './client'

export async function loginUser(email, password) {
  const res = await client.post('/api/auth/login', { email, password })
  return res.data
}

export async function registerUser(form) {
  const res = await client.post('/api/auth/register', form)
  return res.data
}
