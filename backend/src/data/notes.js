// Our "database" — resets every restart.
export const notes = [
  { id: 1, title: 'Welcome', body: 'Delete me and see what happens.' },
  {
    id: 2,
    title: 'Restart the server',
    body: 'These notes reset. That is the point.',
  },
]

let nextId = 3
export const newId = () => nextId++
