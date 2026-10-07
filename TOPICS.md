# Session-by-Session Topics

50 hours in 5 modules, all on the MERN stack (MongoDB, Express, React, Node.js). Each session is 1–2 hours and lists what to cover, the learning objective, and homework. Sessions marked 🛠️ are practice sessions, where students build and the instructor goes around helping.

| Module | Hours | Project |
|---|---|---|
| 1. Introduction & Core Concepts | 8 | Labs only |
| 2. Express.js Fundamentals | 8 | Notes API, data kept in memory ([backend/](backend/)) |
| 3. Database Integration & Authentication | 12 | Notes API with MongoDB and auth ([notes-api/](notes-api/)), Library API |
| 4. Advanced Topics & Deployment | 12 | Helpdesk API ([helpdesk-api/](helpdesk-api/)) |
| 5. React.js Fundamentals & API Integration | 10 | Helpdesk Client ([helpdesk-client/](helpdesk-client/)) |

The labs for each module are listed in the [README](README.md#labs).

---

## Module 1: Introduction & Core Concepts (8 hrs)

### 1.1 What is Node.js (1.5 hrs)
**Topics:** Why Node exists (JavaScript outside the browser, the V8 engine), browser JS vs Node JS (no `window`/`document`, but `fs`/`http` instead). Installing Node and npm, `node -v` / `npm -v`, the REPL. Running `node hello.js`, `console.log` vs `process.stdout.write`, reading arguments with `process.argv.slice(2)`.
**Objective:** Run a JavaScript file from the terminal and read command-line arguments.
**Homework:** Write a script that takes two numbers from the command line and prints their sum, difference, and product.

### 1.2 Modules, npm, and project structure (1.5 hrs)
**Topics:** CommonJS `require` / `module.exports`, exporting one value vs an object, relative paths. Built-in modules: `path` (`join`, `resolve`, `extname`) and `os`. `npm init -y` and every field in `package.json`, `dependencies` vs `devDependencies`, `package-lock.json`, `node_modules` and `.gitignore`, npm scripts. A typical Node project layout (`src/`, `routes/`, `controllers/`, `models/`, `.env`). A quick look at ESM `import`/`export`.
**Objective:** Split code across files, install packages, and set up a clean project.
**Homework:** Create a project with a `mathUtils.js` module and a `start` script, install one package, and push it to GitHub with a `.gitignore`.

### 1.3 File system with `fs` (1.5 hrs)
**Topics:** `writeFileSync` / `readFileSync` / `appendFileSync`, Buffers vs `'utf8'` strings, `existsSync`, `mkdirSync`, `readdirSync`. The callback versions and error-first `(err, data)`. A live demo of how sync code blocks and async code doesn't. `fs.promises` as the modern API.
**Objective:** Read and write files synchronously and asynchronously, and explain the difference.
**Homework:** Write a script that creates a `data/` folder if it's missing, writes three files into it, then lists and prints them.

### 1.4 Event-driven architecture and the event loop (1.5 hrs)
**Topics:** `EventEmitter` with `.on`, `.once` and `.emit`, and why HTTP servers and streams are built on it. Single-threaded JS with the libuv thread pool. Call stack, callback queue, microtask queue. The order of `setTimeout(fn, 0)`, `setImmediate`, `process.nextTick` and `Promise.then`. Blocking the loop with a heavy `for` loop.
**Objective:** Predict the output order of mixed sync/async code and explain why Node is non-blocking.
**Homework:** Given a scrambled snippet of timers, promises, `nextTick` and sync logs, predict the output, then run it and explain any mismatch.

### 1.5 Callbacks, promises, async/await (2 hrs)
**Topics:** Error-first callbacks and callback hell. Promises: states, `.then` / `.catch` / `.finally`, chaining, turning a callback into a promise, `Promise.all` / `allSettled` / `race`. `async` / `await` with `try` / `catch`, sequential vs parallel awaits, common mistakes (a missing `await`, `await` inside loops).
**Objective:** Write the same async task three ways and choose async/await by default.
**Homework:** Read file A, write file B, then read B. Do it with nested callbacks, then promises, then async/await.

🛠️ **Module 1 labs:** word counter, file organizer, log watcher, async drill.

---

## Module 2: Express.js Fundamentals (8 hrs)

Project: **Notes API, data kept in memory** ([backend/](backend/))

### 2.1 From `http` to Express (1.5 hrs)
**Topics:** A server with the built-in `http` module, reading `req.url` / `req.method` by hand and why that gets messy. Installing Express, `app.listen`, `app.get`, `res.send` vs `res.json`, `nodemon` for auto-restart.
**Objective:** Build a server with `http`, then build the same server in Express.
**Homework:** Build an Express server with `/`, `/about` and `/time` routes that return JSON.

### 2.2 REST concepts and the request object (1.5 hrs)
**Topics:** REST: resources, URLs as nouns, HTTP verbs, status codes (200, 201, 204, 400, 404, 500). Route params (`req.params`), query strings (`req.query`), JSON bodies (`express.json()` and `req.body`). Testing with Postman or Thunder Client.
**Objective:** Read data from every part of a request and design REST URLs.
**Homework:** Build `/products/:id` and `/products?category=x&limit=n` on top of a hard-coded array.

### 2.3 CRUD: GET, POST, PUT, DELETE (1.5 hrs)
**Topics:** Start the Notes API. Keep notes in an array and build `GET /notes`, `GET /notes/:id`, `POST /notes`, `PUT /notes/:id` and `DELETE /notes/:id`. Generate IDs, return 404 for a note that doesn't exist, and use the right status code for each action.
**Objective:** Build a complete CRUD REST API.
**Homework:** Finish all five endpoints and save a Postman collection to the repo.

### 2.4 Middleware (1.5 hrs)
**Topics:** What middleware is, `(req, res, next)`, and why order matters. App-level vs route-level middleware. Built-in middleware (`express.json`, `express.static`) and third-party middleware (`cors`, `morgan`). Writing your own: a logger and a validator for the note body.
**Objective:** Write custom middleware and explain the order the pipeline runs in.
**Homework:** Add a logger that prints method, URL, and response time, plus a middleware that rejects notes without a title.

### 2.5 Error handling and project structure (2 hrs)
**Topics:** A 404 handler, a central error handler `(err, req, res, next)`, passing errors on with `next(err)`, the same response shape everywhere. Splitting the code into `routes/`, `controllers/` and `data/`. `.env` and `dotenv`, `.env.example`.
**Objective:** Handle errors in one place and organize an Express app into folders.
**Homework:** Split your Notes API into routes and controllers without changing its behavior, and move `PORT` into `.env`.

🛠️ **Module 2 labs:** Student Records API, URL shortener, middleware drill.

---

## Module 3: Database Integration & Authentication (12 hrs)

Projects: **Notes API with MongoDB and auth** ([notes-api/](notes-api/)) and **Library API**

### 3.1 MongoDB basics (1.5 hrs)
**Topics:** Documents and collections vs tables and rows. Local MongoDB vs Atlas, connection strings, Compass. Insert, `find` with filters, update and delete in the shell or Compass.
**Objective:** Set up MongoDB and run CRUD on documents by hand.
**Homework:** Create a `notes` collection, insert five documents, and try three different `find` filters.

### 3.2 Mongoose: connect, schema, model, CRUD (2 hrs)
**Topics:** `mongoose.connect` with the URI from `.env`. Schemas, types, `timestamps`, models. `create`, `find`, `findById`, `findByIdAndUpdate`, `findByIdAndDelete`. Invalid `ObjectId` errors. Swapping the in-memory array for Mongoose in the controllers.
**Objective:** Connect Express to MongoDB and run every CRUD operation through Mongoose.
**Homework:** Move your Notes API to MongoDB and add sorting and pagination to `GET /notes`.

### 3.3 Validation and relationships (1.5 hrs)
**Topics:** Schema validation (`required`, `minlength`, `enum`, `unique`), turning validation errors into 400 responses. References with `ref` and `ObjectId`, `populate` and choosing which fields to return.
**Objective:** Enforce data rules in the model and link two collections.
**Homework:** Add a `User` model and a `user` ref on `Note`, and return notes with the author's name populated.

### 3.4 Migrations and seeders (1 hr)
**Topics:** Why seed data helps (demos, tests, a fresh database). A `seed.js` script that clears and refills collections, run with `npm run seed`. Migrations for schema changes in MongoDB (for example `migrate-mongo`): up and down scripts.
**Objective:** Fill a database with repeatable test data and change existing data safely.
**Homework:** Write a seed script that creates two users and ten notes, and a migration that adds a `pinned: false` field to every existing note.

### 3.5 Registration and password hashing (1.5 hrs)
**Topics:** Why passwords are never stored as plain text. Hashing and salting with `bcrypt`. A register endpoint with validation, duplicate-email handling, and a response that leaves out the password (`select: false`).
**Objective:** Register users with securely hashed passwords.
**Homework:** Build `POST /auth/register` and confirm in Compass that the password is stored as a hash.

### 3.6 Login and JWT (1.5 hrs)
**Topics:** How a JWT is built (header, payload, signature), `jwt.sign` with a secret from `.env` and an expiry. A login endpoint that uses `bcrypt.compare`. An auth middleware that reads `Authorization: Bearer <token>`, runs `jwt.verify`, and sets `req.user`. Protecting the note routes.
**Objective:** Log users in with a JWT and protect routes with it.
**Homework:** Make `GET /notes` return only the current user's notes, and return 403 when someone edits another user's note.

### 3.7 Role-based access control (1 hr)
**Topics:** A `role` field on `User`, an `authorize('admin')` middleware, 401 vs 403. A `/me` endpoint. Admin-only routes.
**Objective:** Restrict routes by role.
**Homework:** Add an admin-only `GET /users`, and let admins see every user's notes.

### 3.8 🛠️ Practice: Library API (2 hrs)
**Topics:** Build a new API from scratch with Book, Member and Loan models. Use `populate` on loans. Code the rules: a member can have at most 3 books on loan, and a book can't be lent out while it's already on loan. Only a librarian can add books. Include a seed script.
**Objective:** Apply Module 3 to a new app with several related models.
**Homework:** Finish the API, add a `GET /members/:id/loans` endpoint, and push it.

🛠️ **Module 3 labs:** Recipe API, auth drill.

---

## Module 4: Advanced Topics & Deployment (12 hrs)

Project: **Helpdesk API** ([helpdesk-api/](helpdesk-api/))

### 4.1 Designing a complete REST API (2 hrs)
**Topics:** Plan the Helpdesk API before writing code: resources (users, tickets, comments), URLs, status codes, roles (`student`, `staff`, `admin`). Build it with auth, filtering (`?status=Open`), pagination, and consistent errors.
**Objective:** Design and build a complete REST API from a plan.
**Homework:** Add ticket comments, and let only staff change a ticket's status.

### 4.2 API documentation with Swagger (1.5 hrs)
**Topics:** What OpenAPI is. `swagger-jsdoc` and `swagger-ui-express`, documenting routes, request bodies and responses, adding a Bearer auth button, trying requests from `/api-docs`.
**Objective:** Publish live, interactive API docs.
**Homework:** Document every Helpdesk endpoint and test the protected ones from the Swagger page.

### 4.3 Real-time updates with Socket.io (2 hrs)
**Topics:** HTTP vs WebSockets. Setting up a Socket.io server on the same HTTP server as Express. `emit`, `on`, `broadcast`, rooms. Sending events when a ticket is created or its status changes. A plain HTML test client.
**Objective:** Push live updates from the server to connected clients.
**Homework:** Put each ticket in its own room so that only people watching that ticket get its updates.

### 4.4 Unit testing with Mocha and Chai (2 hrs)
**Topics:** Why tests matter. Setting up Mocha, `describe` / `it`, Chai's `expect`. Testing a plain function first, then API routes with `supertest`. A separate test database, plus `before` / `after` hooks to reset it.
**Objective:** Write tests that run automatically and catch mistakes before they ship.
**Homework:** Write at least 5 tests for Helpdesk auth and ticket routes, including one for a 401 and one for a 403.

### 4.5 Debugging and logging (1.5 hrs)
**Topics:** The VS Code debugger and `node --inspect`, breakpoints, stepping through code, watching variables. Request logging with `morgan`, app logging with levels (`pino` or `winston`), and why `console.log` isn't enough in production. Never log passwords or tokens.
**Objective:** Find bugs with a debugger and add useful logs.
**Homework:** Add request and error logging to the Helpdesk API, then find a planted bug using breakpoints.

### 4.6 GitHub and cloud deployment (2 hrs)
**Topics:** A clean GitHub repo: `.gitignore`, `.env.example`, a README, meaningful commits. Deploying to Render or Railway (Heroku and AWS as paid alternatives), setting environment variables on the host, allowing the host to connect to Atlas, health-check endpoints, reading logs on the host.
**Objective:** Deploy the API to a public URL.
**Homework:** Deploy the Helpdesk API and share the live Swagger URL.

### 4.7 🛠️ Practice: finish Helpdesk API (1 hr)
**Topics:** Close any gaps: tests pass, docs are complete, the deployed version matches the code on GitHub.
**Objective:** A finished, tested, documented and deployed backend.
**Homework:** Choose your final project topic and write down its models, roles and endpoints.

🛠️ **Module 4 labs:** chat room, testing lab, document it.

---

## Module 5: React.js Fundamentals & API Integration (10 hrs)

Project: **Helpdesk Client** ([helpdesk-client/](helpdesk-client/)), which connects to the Helpdesk API

### 5.1 React, Vite, JSX, components and props (2 hrs)
**Topics:** Why React exists and what a component is. `npm create vite@latest`, the project layout, JSX rules (one root element, `className`, `{}` for expressions). Function components, props, rendering lists with `.map()` and `key`.
**Objective:** Scaffold a React app and build a UI from components.
**Homework:** Build a static ticket list from an array, using `<TicketCard />` components.

### 5.2 State, events and forms (2 hrs)
**Topics:** `useState`, why state changes cause a re-render, event handlers. Controlled inputs, submitting a form with `preventDefault`, simple validation messages.
**Objective:** Manage state and build a controlled form.
**Homework:** Build a "New ticket" form that adds tickets to the list (still in memory).

### 5.3 `useEffect` and calling the API (2 hrs)
**Topics:** `useEffect` and its dependency array. fetch vs axios, an axios instance with a `baseURL`, loading and error states, CORS problems and how to fix them. Loading and creating tickets through the real Helpdesk API.
**Objective:** Replace mock data with live data from your own backend.
**Homework:** Add status filters that call `GET /tickets?status=...`.

### 5.4 React Router (2 hrs)
**Topics:** `BrowserRouter`, `Routes`, `Route`, `Link`, `useNavigate`, `useParams`. A layout with a nav bar, a ticket detail page at `/tickets/:id`, a 404 page. Login and register pages.
**Objective:** Build a multi-page app with routing.
**Homework:** Finish the list, detail, login and register pages.

### 5.5 Auth state, JWT and live updates (2 hrs)
**Topics:** Store the token after login, send it with an axios interceptor, keep the user logged in after a refresh, logout, a `PrivateRoute` for protected pages, send the user to login on a 401. Show or hide staff-only actions based on role. Connect `socket.io-client` for live status updates. Deploy to Vercel or Netlify.
**Objective:** A complete, deployed full-stack app.
**Homework:** Work through the whole app from start to finish (register, login, create a ticket, update it live, log out) and share both live URLs.

🛠️ **Module 5 labs:** frontend for a backend lab, login flow.

---

## Final project

After Module 5, each student builds their own full-stack MERN app. Requirements and suggested topics are in the [README](README.md#final-project).

---

## Instructor notes

- **Session shape:** about 10 min recap, 50–60 min new concept with live coding, then a guided exercise for the rest. Practice sessions are almost all building.
- **Type, don't paste.** Students code along in every session.
- **Push every session.** A commit per class makes progress and blockers visible.
- **Practice sessions are buffers.** If a module runs long, take the extra time from its practice session instead of skipping content.
- **Common sticking points:** event loop order (1.4), middleware order (2.4), async errors in Mongoose (3.2), JWT middleware (3.6), `useEffect` dependency arrays (5.3), and CORS (5.3). Plan extra time for these.
- **Module 5 depends on a working Helpdesk API.** Students who are behind can use the deployed reference API so they aren't blocked.
- **Not covered:** MySQL/PostgreSQL integration from the syllabus is left out, because the course uses MongoDB only.
