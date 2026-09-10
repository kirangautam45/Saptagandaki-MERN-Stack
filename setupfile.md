# Node.js Project Setup for Beginners

This file explains how to create a Node.js project from scratch.

---

## 1. Create a new folder

```bash
mkdir my-first-node-app
cd my-first-node-app
```

---

## 2. Initialize the project

```bash
npm init -y
```

This creates a `package.json` file.

---

## 3. Check Node.js is installed

```bash
node -v
npm -v
```

If these commands work, Node.js is installed.

---

## 4. Install Express

```bash
npm install express
```

Express is a framework used to create backend servers and APIs.

---

## 5. Create a server file

```bash
touch server.js
```

Then add this code to `server.js`:

```js
import express from 'express'

const app = express()
const port = 4000

app.get('/', (req, res) => {
  res.send('Hello from Node.js!')
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
```

---

## 6. Add scripts in package.json

Open `package.json` and make sure it has:

```json
"type": "module",
"scripts": {
  "start": "node server.js"
}
```

Your package.json should look like this:

```json
{
  "name": "my-first-node-app",
  "version": "1.0.0",
  "main": "server.js",
  "type": "module",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.21.2"
  }
}
```

---

## 7. Run the project

```bash
npm start
```

Then open:

```text
http://localhost:4000
```

You should see:

```text
Hello from Node.js!
```

---

## 8. Create a basic API route

Update `server.js` to:

```js
import express from 'express'

const app = express()
const port = 4000

app.get('/', (req, res) => {
  res.json({ message: 'Hello from Node API' })
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
```

This sends JSON instead of plain text.

---

## 9. Project flow for beginners

A simple backend flow is:

1. Client sends a request
2. Server receives it
3. Server checks the route
4. Server sends a response

Example:

```http
GET /
```

Response:

```json
{ "message": "Hello from Node API" }
```

---

## 10. Next steps

After this, you can learn:

- GET route
- POST route
- PUT route
- DELETE route
- JSON body parsing
- Express middleware
- connecting to a database

---

## Beginner Tips

- Use `npm start` to run the project.
- Keep your files simple.
- Use one route at a time.
- Test with the browser or curl.
- Do not worry about databases at the beginning.

---

## Final reminder

The simplest beginner Node.js project is:

- folder
- package.json
- server.js
- Express installed
- server running on localhost

That is the foundation of backend development.
