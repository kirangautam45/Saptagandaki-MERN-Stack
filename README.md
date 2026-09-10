# Day 01 — Notes API (Express)

A single-file REST API built with Express. There is no database: every note lives in a plain
JavaScript array in memory. Restart the server and the notes reset to their starting values —
that is intentional, and it is the whole lesson for day one.

- Runtime: Node.js 20+
- Framework: Express 4
- Module system: ESM (`"type": "module"` in `package.json`, so `import` works instead of `require`)

---

## Quick start

**npm**

```bash
npm install     # install dependencies (only needed once)
npm run dev     # start with auto-restart on file changes
```

**yarn**

```bash
yarn            # install dependencies (only needed once)
yarn dev        # start with auto-restart on file changes
```

Open http://localhost:4000 — you should see `{"status":"ok","notes":2}`.

Use `npm start` / `yarn start` if you don't want the auto-restart.
The port comes from the `PORT` environment variable and falls back to `4000`:

```bash
PORT=5000 npm start
PORT=5000 yarn start
```

Pick one package manager and stay with it. Mixing them leaves you with both a
`package-lock.json` and a `yarn.lock`, which drift apart and give teammates different installs.

---

## Build it from scratch — step by step

This is how the project was created. Follow it in an empty folder to reproduce it command by command.

Both package managers are shown at each step — run whichever one you chose.

### 1. Check that Node is installed

```bash
node -v     # should print v20.x or newer
npm -v
```

If `node` is not found, install it from [nodejs.org](https://nodejs.org) (LTS build) or with
`brew install node` on macOS.

To use yarn, check for it and install it if missing:

```bash
yarn -v                    # if this fails, install it:
corepack enable            # ships with Node 20+, no extra download
# or: npm install -g yarn
```

### 2. Create the project folder

```bash
mkdir day-01-backend
cd day-01-backend
```

### 3. Create `package.json`

```bash
npm init -y      # npm
yarn init -y     # yarn
```

`-y` accepts every default so you don't have to answer the prompts. This writes a `package.json`,
which is the manifest your package manager uses to track dependencies and scripts.

### 4. Turn on ES modules

Open `package.json` and add this line at the top level:

```json
"type": "module"
```

Without it, Node treats `.js` files as CommonJS and `import express from 'express'` throws
`Cannot use import statement outside a module`.

### 5. Install Express

```bash
npm install express     # npm
yarn add express        # yarn
```

This creates `node_modules/` (the actual library code) and a lockfile pinning the exact version
tree, so a teammate gets identical installs — `package-lock.json` for npm, `yarn.lock` for yarn.
Both are written automatically. Commit the lockfile; never commit `node_modules/`.

### 6. Install nodemon as a dev dependency

```bash
npm install --save-dev nodemon     # npm
yarn add --dev nodemon             # yarn
```

`--save-dev` / `--dev` marks it as a tool you need while developing but not in production. nodemon
watches your files and restarts the server on every save, so you stop killing and re-running
`node server.js` by hand.

### 7. Add the run scripts

In `package.json`, replace the placeholder `scripts` block with:

```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

Now `npm start` / `yarn start` runs the server once, and `npm run dev` / `yarn dev` runs it in
watch mode. npm needs `run` for every script except a few special names like `start`; yarn doesn't
need `run` at all, though `yarn run dev` works too.

### 8. Ignore the files that shouldn't be committed

Create `.gitignore`:

```
node_modules/
npm-debug.log*
.DS_Store
.env
```

`node_modules/` is rebuilt from `package.json` with `npm install` / `yarn`, so it never belongs
in git. If you're on yarn, add `yarn-error.log` to that list as well.

### 9. Write the server

Create `server.js`. The minimum that runs:

```js
import express, { json } from 'express'

const app = express()
const PORT = process.env.PORT || 4000

app.use(json())   // parses JSON request bodies into req.body

app.get('/', (req, res) => {
  res.json({ status: 'ok' })
})

app.listen(PORT, () => {
  console.log(`Notes API running on http://localhost:${PORT}`)
})
```

Then add the routes one at a time — read, create, update, delete — testing each with `curl`
before writing the next. The finished version is in [server.js](server.js).

### 10. Run it

```bash
npm run dev     # npm
yarn dev        # yarn
```

You should see `Notes API running on http://localhost:4000`. Stop it with `Ctrl+C`.

### Command comparison

| Task                       | npm                           | yarn                    |
| -------------------------- | ----------------------------- | ----------------------- |
| Create `package.json`      | `npm init -y`                 | `yarn init -y`          |
| Install everything         | `npm install`                 | `yarn`                  |
| Add a dependency           | `npm install express`         | `yarn add express`      |
| Add a dev dependency       | `npm install --save-dev nodemon` | `yarn add --dev nodemon` |
| Remove a package           | `npm uninstall express`       | `yarn remove express`   |
| Run a script               | `npm run dev`                 | `yarn dev`              |
| Run the `start` script     | `npm start`                   | `yarn start`            |
| Lockfile it writes         | `package-lock.json`           | `yarn.lock`             |

---

## API reference

Base URL: `http://localhost:4000`

| Method | Path             | Purpose                          | Success |
| ------ | ---------------- | -------------------------------- | ------- |
| GET    | `/`              | Health check + note count        | 200     |
| GET    | `/api/notes`     | List every note                  | 200     |
| GET    | `/api/notes/:id` | Get one note                     | 200     |
| POST   | `/api/notes`     | Create a note                    | 201     |
| PUT    | `/api/notes/:id` | Update a note (partial is fine)  | 200     |
| DELETE | `/api/notes/:id` | Delete a note                    | 200     |

A note looks like:

```json
{ "id": 1, "title": "Welcome", "body": "Delete me and see what happens." }
```

### Errors

| Status | When                                                     |
| ------ | -------------------------------------------------------- |
| 400    | `title` is missing or empty on create; `body` isn't a string |
| 404    | No note with that id, or the route doesn't exist          |

Every error is JSON: `{ "error": "No note with id 9" }`

---

## Try every endpoint

Run these with the server up in another terminal.

```bash
# Health check
curl http://localhost:4000

# List all notes
curl http://localhost:4000/api/notes

# Get one note
curl http://localhost:4000/api/notes/1

# Create a note
curl -X POST http://localhost:4000/api/notes \
  -H "Content-Type: application/json" \
  -d '{"title":"First note","body":"Written with curl."}'

# Update just the title of note 3
curl -X PUT http://localhost:4000/api/notes/3 \
  -H "Content-Type: application/json" \
  -d '{"title":"Renamed"}'

# Delete note 3
curl -X DELETE http://localhost:4000/api/notes/3

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
