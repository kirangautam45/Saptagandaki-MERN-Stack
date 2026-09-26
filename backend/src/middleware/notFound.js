export default (req, res) => {
  res.status(404).json({ error: `Cannot ${req.method} ${req.url}` })
}
