import jwt from 'jsonwebtoken'

import User from '../models/User.js'

function sendToken(res, user, status = 200) {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
  res.status(status).json({ token, user: { id: user._id, name: user.name, email: user.email } })
}

export async function register(req, res) {
  try {
    const { name, email, password } = req.body

    const exists = await User.findOne({ email })
    if (exists) return res.status(400).json({ message: 'Email already registered' })

    const user = await User.create({ name, email, password })
    sendToken(res, user, 201)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    sendToken(res, user)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
