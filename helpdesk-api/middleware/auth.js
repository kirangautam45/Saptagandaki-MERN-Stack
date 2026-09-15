import jwt from 'jsonwebtoken'

// Checks the "Authorization: Bearer <token>" header and sets req.userId
export default function protect(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ message: 'No token, please log in' })

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.userId = payload.id
    next()
  } catch {
    res.status(401).json({ message: 'Invalid token' })
  }
}
