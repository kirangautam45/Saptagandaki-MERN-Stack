# Day 01: Beginner Notes API with Express

Welcome! This project is designed for students who are just starting with backend development.

The goal is simple: build a small API that stores notes in memory, just like a very tiny database. You will learn the basics of:

- Node.js
- Express.js
- REST APIs
- GET, POST, PUT, and DELETE requests
- JSON data
- Running a local server

This project is intentionally simple and beginner-friendly. The notes are stored in an array inside the server, so when the server restarts, the data resets. That is okay for learning!

---

## What this project teaches

By the end of this project, you should understand:

- how a backend server starts
- how routes work
- how clients send requests to a server
- how a server sends responses back
- how JSON is used in APIs
- how to test an API using curl or Postman

---

## Prerequisites

Before starting, make sure you have installed:

- Node.js 20.12 or newer (needed for `process.loadEnvFile()`, which loads `.env`)
- npm (comes with Node.js)

To check if Node is installed:

```bash
node -v
npm -v
```

If you see version numbers, you are ready to begin.

---

## Project setup

Open your terminal and go to the project folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the project folder to pick the port:

```text
PORT=4000
```

`server.js` loads this file with `process.loadEnvFile()`, which is built into Node, so no extra package is needed.

Run in development mode with auto-restart:

```bash
npm run dev
```

Or run it once:

```bash
npm start
```

After the server starts, open this in your browser:

```text
http://localhost:4000
```

---

## How the code is organized

```text
server.js                  creates the app, registers middleware and routes, starts the server
src/
  routes/notes.js          which URL + method calls which controller
  controllers/notes.js     the logic for each endpoint (list, get, create, update, delete)
  data/notes.js            the in-memory notes array that stands in for a database
  middleware/notFound.js   the catch-all 404 response
```

A request flows through the files like this:

```text
server.js -> routes/notes.js -> controllers/notes.js -> data/notes.js
```

- app = the backend server, created in `server.js`
- route = the URL the client calls, listed in `src/routes/notes.js`
- request = what the client sends (`req`)
- response = what the server sends back (`res`)

In `server.js`, the order matters:

1. `express.json()` parses JSON request bodies into `req.body`.
2. `app.use('/api/notes', notesRouter)` mounts the notes routes, so `router.get('/:id', ...)`
   answers `GET /api/notes/:id`.
3. `app.use(notFound)` runs only if no route matched. It must come *after* the routes.
4. `app.listen()` starts the server.

Each route in `src/routes/notes.js` is one line:

```js
router.get('/', listNotes)
router.post('/', createNote)
router.get('/:id', getNote)
router.put('/:id', updateNote)
router.delete('/:id', deleteNote)
```

---

## Common backend terms

Here are a few simple definitions:

- Express: a framework for creating Node.js servers
- Route: a URL like /api/notes
- Request: the data sent by the browser or client
- Response: the data sent back by the server
- JSON: a way to send structured data using objects and arrays
- Middleware: code that runs between the request and the response

---

## Example API flow

A beginner-friendly flow looks like this:

1. The client sends a request to the server
2. The server reads the route and method
3. The server checks the data
4. The server performs an action
5. The server returns a response

Example:

```http
GET /api/notes
```

The server might return:

```json
[
  { "id": 1, "title": "Welcome", "body": "This is my first note" }
]
```

---

## Suggested learning path

Start small and build step by step.

### Step 1: Start the server

Make sure the app runs without errors.

### Step 2: Add a health route

Add a route like:

```js
app.get('/', (req, res) => {
  res.json({ status: 'ok' })
})
```

### Step 3: Create note data

Use an array in memory:

```js
let notes = [
  { id: 1, title: 'First note', body: 'Hello world' }
]
```

### Step 4: Read all notes

Add a route to return the full array.

### Step 5: Read one note

Add a route using an id parameter.

### Step 6: Create a note

Use POST and read JSON from the request body.

### Step 7: Update a note

Use PUT to modify existing note data.

### Step 8: Delete a note

Use DELETE to remove a note from the array.

---

## Example requests

You can test the API using curl.

### Health check

```bash
curl http://localhost:4000
```

### List notes

```bash
curl http://localhost:4000/api/notes
```

### Create a note

```bash
curl -X POST http://localhost:4000/api/notes \
  -H "Content-Type: application/json" \
  -d '{"title":"My first note","body":"I am learning Express."}'
```

### Update a note

```bash
curl -X PUT http://localhost:4000/api/notes/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated title"}'
```

### Delete a note

```bash
curl -X DELETE http://localhost:4000/api/notes/1
```

### Errors

```bash
curl http://localhost:4000/api/notes/999          # 404
curl -X POST http://localhost:4000/api/notes \
  -H "Content-Type: application/json" -d '{}'     # 400, title is required
```

The `-H "Content-Type: application/json"` header matters: without it Express's `json()` middleware
skips the body and `req.body` comes back empty, so you'd get a confusing "title is required".

---

## Important beginner notes

- The notes live in memory, so they reset when the server restarts.
- This is normal for a learning project.
- You do not need a database yet.
- The main goal is to understand how API requests and responses work.

---

## Troubleshooting

**`EADDRINUSE: address already in use :::4000`**
Something is already on that port. Change `PORT` in `.env`, or free the port:

```bash
lsof -ti:4000 | xargs kill
```

**The server ignores the port in `.env`**
Make sure `.env` sits next to `server.js` and you start the server from that folder.
`process.loadEnvFile()` needs Node 20.12 or newer (`node -v`).

**`Cannot use import statement outside a module`**
Make sure `package.json` has `"type": "module"`.

**`Cannot find module 'express'`**
Run `npm install`. If it still fails, delete `node_modules/` and `package-lock.json` and install again.

**`Cannot find module '.../src/...'`**
ES modules need the full file name in imports, including `.js`: `'./src/routes/notes.js'`.

**`nodemon: command not found`**
Run `npm install` so devDependencies are installed, then start with `npm run dev`.

**Changes don't show up**
`npm start` doesn't reload. Use `npm run dev`, or restart manually.

**A note I created disappeared**
The array is in memory. Restarting the server wipes it.

---

## Next steps

Once you understand this project, the next steps are:

- connect to a database (MongoDB with Mongoose)
- replace `src/data/notes.js` with a database model
- add authentication
- build a frontend with React

For now, focus on understanding the flow:

Request -> Route -> Controller -> Response

That is the foundation of backend development.

---

## Summary

This project is your first backend API. It is simple, but it teaches the core ideas used in almost every modern web app.

If you understand this project, you are already learning the basics of how real applications work.
