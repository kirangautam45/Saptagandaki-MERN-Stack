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

- Node.js 18 or newer
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
cd day-01-backend
```

Install dependencies:

```bash
npm install
```

If you want to run the project in development mode with auto-restart:

```bash
npm run dev
```

If you just want to run it once:

```bash
npm start
```

After the server starts, open this in your browser:

```text
http://localhost:4000
```

---

## Understanding the project

The main file is [server.js](server.js).

That file creates an Express app and starts a server. In a beginner project, the important ideas are:

- app = the backend server
- route = the URL the client calls
- request = what the client sends
- response = what the server sends back

Example idea:

```js
app.get('/api/notes', (req, res) => {
  res.json({ message: 'hello from backend' })
})
```

This means:

- when someone visits /api/notes
- the server receives the request
- it sends back some JSON data

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

---

## Important beginner notes

- The server is running in memory, so the notes reset when the server restarts.
- This is normal for a learning project.
- You do not need a database yet.
- The main goal is to understand how API requests and responses work.

---

## Troubleshooting

### The server does not start

Check if Node is installed:

```bash
node -v
```

Then install dependencies again:

```bash
npm install
```

### Port is already in use

If port 4000 is blocked, start the server on a different port:

```bash
PORT=5000 npm start
```

### Cannot use import syntax

Make sure your package.json has:

```json
"type": "module"
```

### Module not found

Run:

```bash
npm install
```

---

## Next steps

Once you understand this project, the next steps are:

- connect to a database
- use MongoDB or MySQL
- add authentication
- build a frontend with React
- organize your project into folders

For now, focus on understanding the flow:

Request -> Route -> Logic -> Response

That is the foundation of backend development.

---

## Summary

This project is your first backend API. It is simple, but it teaches the core ideas used in almost every modern web app.

If you understand this project, you are already learning the basics of how real applications work.


# Errors
curl http://localhost:4000/api/notes/999          # 404
curl -X POST http://localhost:4000/api/notes \
  -H "Content-Type: application/json" -d '{}'     # 400, title is required
```

The `-H "Content-Type: application/json"` header matters: without it Express's `json()` middleware
skips the body and `req.body` comes back empty, so you'd get a confusing "title is required".

---

## How the code is organized

`server.js` reads top to bottom in the order Express evaluates it:

1. **Setup** — create the app, pick the port, register the `json()` body parser.
2. **Data** — the `notes` array and `nextId` counter that stand in for a database.
3. **Routes** — one `app.METHOD(path, handler)` per endpoint. Each handler either sends a response
   or returns early with an error status.
4. **Catch-all 404** — `app.use()` with no path runs only if no route above it matched.
   It must come *after* the routes; move it up and it swallows everything.
5. **`app.listen()`** — starts the server. Nothing below this line runs until a request arrives.

---

## Troubleshooting

**`EADDRINUSE: address already in use :::4000`**
Something is already on that port. Either run on a different one (`PORT=4001 npm run dev`) or free it:

```bash
lsof -ti:4000 | xargs kill
```

**`Cannot use import statement outside a module`**
`"type": "module"` is missing from `package.json` (step 4).

**`Cannot find module 'express'`**
Run `npm install` / `yarn`. If it still fails, delete `node_modules/` plus your lockfile
(`package-lock.json` or `yarn.lock`) and install again.

**`nodemon: command not found`**
Run `npm install` / `yarn` so devDependencies are installed. Always start it via `npm run dev` or
`yarn dev` — that resolves nodemon from `node_modules/.bin/`, which a bare `nodemon server.js` does not.

**Changes don't show up**
`npm start` / `yarn start` doesn't reload. Use `npm run dev` / `yarn dev`, or restart manually.

**Both `package-lock.json` and `yarn.lock` exist**
Someone mixed package managers. Pick one, delete the other lockfile along with `node_modules/`,
then reinstall with the manager you kept.

**A note I created disappeared**
The array is in memory. Restarting the server wipes it. Persisting data is the next day's work.
