# Day-by-Day Topics

45 classes × 50 minutes. Each day lists what to cover, the learning objective, and homework.

**Legend:** 🛠️ = practice day (no new theory)

---

## Week 1 — Node.js Basics (Days 1–5)

### Day 1 — What is Node.js
**Objective:** Run a JavaScript file from the terminal and read command-line arguments.
**Teach:**
- Frame the problem first: JS used to only run in a browser tab. Node puts the V8 engine into a standalone binary so JS can run on a server, a laptop script, a CLI tool. Draw the "browser JS" vs "Node JS" boundary — no `window`/`document` in Node, no `fs`/`http` in the browser.
- Live-demo installing Node (or confirm via `node -v` / `npm -v` if preinstalled) and explain what npm is at a glance (comes bundled, package manager — details land Day 4).
- Open the Node REPL (`node`), type a few expressions, show `.exit`. Point out this is the same V8 that's in Chrome.
- Create `hello.js` with a single `console.log('hello')`, run `node hello.js`. Emphasize: no `<script>` tag, no browser — just `node <file>`.
- Explain `console.log` is really writing to standard out; show `process.stdout.write('hi')` side by side and contrast the automatic newline `console.log` adds vs `process.stdout.write` not adding one.
- Introduce `process.argv` — log it raw first so students see the full array (node path, script path, then their args), then show slicing `process.argv.slice(2)` to get just the user-supplied arguments.
- Live-code a script that reads two CLI args, converts them with `Number()`, and prints a sum — walk through running it with different arguments in the terminal so the mechanic feels concrete before moving on.

### Day 2 — Modules
**Objective:** Split code across files and use Node's built-in modules.
**Teach:**
- Motivate modules: one giant file doesn't scale, and every language has a way to split code and share it. Node's original system is CommonJS.
- Live-code a two-file example: a `greet.js` with `module.exports = function greet() {...}`, required from `index.js` with `const greet = require('./greet')`. Then show exporting an object with multiple functions (`module.exports = { add, subtract }`) vs a single value, and destructuring on require (`const { add } = require('./mathUtils')`).
- Walk the resolution rules briefly: relative paths need `./`, no extension needed for `.js`, built-in modules are required by bare name.
- Tour `path`: `path.join(__dirname, 'data.txt')` vs `path.resolve`, then `path.basename` / `path.extname` on a sample file path — tie this to "why not just concatenate strings with `/`" (cross-platform separators).
- Tour `os`: log `os.platform()`, `os.cpus().length`, `os.totalmem()` / `os.freemem()` (mention bytes vs GB conversion) — build toward a small "system info" printout live.
- Tour `events`: create an `EventEmitter`, register a listener with `.on('greet', ...)`, fire it with `.emit('greet', name)`. Connect this to what's coming — HTTP servers and streams are built on EventEmitter under the hood.
- Close with ESM as a preview only: show the `import`/`export` syntax side by side with CommonJS, mention `"type": "module"` in `package.json` flips Node's interpretation, and note the reference API in this repo already uses ESM — but this course's day-by-day exercises will keep using `require` per the syllabus convention.

### Day 3 — File System module
**Objective:** Read and write files both synchronously and asynchronously, and explain the difference.
**Teach:**
- Start with `fs.writeFileSync('notes.txt', 'hello')` then `fs.readFileSync('notes.txt', 'utf8')` — log the result without `'utf8'` first so students see a raw `Buffer`, then add the encoding and see a string. Use this to explain buffers vs encodings in one sentence.
- Show `fs.appendFileSync` to add a second line without overwriting.
- Introduce `existsSync`, `mkdirSync`, `readdirSync` — build a tiny live example: check if a `data/` folder exists, create it if not, write a file into it, then list the folder's contents.
- Now the callback versions: `fs.readFile(path, 'utf8', (err, data) => {...})`. Stress the error-first signature — `err` is always the first argument, always check it before touching `data`.
- Demonstrate blocking vs non-blocking concretely: put a `fs.readFileSync` of a large-ish file (or a busy-wait loop) directly before some `console.log` lines and show the logs wait; then swap to `fs.readFile` (async) and show the later logs print first while the read happens in the background. This is the "aha" moment for the whole day.
- Show `fs.promises.readFile(...).then(...)` as the promise-based alternative to the callback API — just a preview, full `.then` chaining is Day 7.
- Recap on a whiteboard/slide: sync = simple but blocks everything; async (callback or promise) = non-blocking but requires handling completion later.

### Day 4 — npm
**Objective:** Initialize a project, manage dependencies, and run npm scripts.
**Teach:**
- Run `npm init -y` live, open the generated `package.json`, and walk every field: `name`, `version`, `main`, `scripts`, `license`. Explain this file is the project's manifest — anyone can clone the repo and know how to run it.
- Explain `dependencies` (needed to run the app) vs `devDependencies` (only needed while developing/testing) with a concrete example of each category.
- Run `npm install <something small, e.g. chalk>` live, watch `node_modules` appear and `package.json`/`package-lock.json` update. Open `node_modules` briefly to show how much gets pulled in — segue into why it's gitignored.
- Create a `.gitignore` with `node_modules` in it; explain `package-lock.json` is what makes installs reproducible across machines and should be committed.
- Explain semantic versioning `MAJOR.MINOR.PATCH` and what `^` (compatible minor/patch updates) and `~` (patch-only updates) allow versus pinning an exact version.
- Add custom `scripts` in `package.json` (e.g. `"start": "node index.js"`), run with `npm start` / `npm run <name>`, and explain why `npm run` is needed for anything not named `start`/`test`.
- Introduce `npx` — run a package's binary without a permanent global install (a quick example command).
- Install `nodemon` as a dev dependency, wire a `dev` script (`nodemon index.js`), run it, and show it auto-restarting the server when a file is saved.

### Day 5 — HTTP server with `http`
**Objective:** Build and run a bare-metal HTTP server with multiple routes.
**Teach:**
- Recap the client/server model: a browser (or Postman) sends a request, a running Node process listens on a port and sends back a response. Node's built-in `http` module lets you be that server with zero dependencies.
- Live-code the minimal server: `http.createServer((req, res) => {...})` and `server.listen(3000)`. Hit it in the browser and in Postman to see the same response two ways.
- Inspect `req.url` and `req.method` by logging them for every request, then hit different paths/methods from the browser and Postman to watch the values change live.
- Build manual routing with `if`/`else` (or `switch`) on `req.url` — a `/` route, an `/about` route, and a fallback that returns 404. Show what happens with no routing logic (every path returns the same thing) before adding it, so the need is obvious.
- Explain `res.writeHead(statusCode, headers)` and set `Content-Type` explicitly for HTML vs JSON responses; show a route returning `text/html` and one returning `application/json` (build the JSON string with `JSON.stringify`).
- Cover common status codes relevant here: 200, 404 — mention others (400/500) will matter more once there's real logic to fail.
- Add an `/api/users` route returning a hard-coded array as JSON, reinforcing the `Content-Type: application/json` + `JSON.stringify` pattern.
- Wrap up by naming the pain points of this approach (manual routing gets messy fast, no built-in JSON body parsing, no route params) — this is the motivation for Express in Week 3.

---

## Week 2 — Async JS + Core Node (Days 6–10)

### Day 6 — Callbacks
**Topics:** Synchronous vs asynchronous execution, functions as arguments, the error-first callback convention `(err, data)`, nesting callbacks with `fs`, callback hell / the pyramid of doom, why it's hard to read and to error-handle.
**Objective:** Write and consume error-first callbacks, and recognize callback hell.
**Homework:** Chain three file operations with nested callbacks (read A → write B → read B), handling errors at each level.

### Day 7 — Promises
**Topics:** What a Promise is, the three states, `new Promise(resolve, reject)`, `.then()` / `.catch()` / `.finally()`, chaining and returning values from `then`, converting a callback API to a Promise, `Promise.all`, `Promise.allSettled`, `Promise.race`.
**Objective:** Create Promises and chain them instead of nesting callbacks.
**Homework:** Rewrite Day 6's homework using Promises and `fs.promises`. Use `Promise.all` to read three files in parallel.

### Day 8 — Async/await
**Topics:** `async` functions always return a Promise, `await` and where it's allowed, `try`/`catch`/`finally` for error handling, sequential vs parallel awaits (`await Promise.all`), common mistakes (forgetting `await`, `await` inside a non-async function, `await` in a loop).
**Objective:** Refactor Promise chains into readable async/await with proper error handling.
**Homework:** Rewrite Day 7's homework with async/await. Write one function that fails and prove the `catch` block runs.

### Day 9 — The event loop
**Topics:** Single-threaded JS + libuv thread pool, the call stack, callback queue and microtask queue, event loop phases (timers, pending, poll, check, close), `setTimeout(fn, 0)` vs `setImmediate` vs `process.nextTick` vs `Promise.then`, blocking the loop with a heavy `for` loop, why Node suits I/O-heavy work.
**Objective:** Predict the output order of mixed sync/async code and explain why Node is non-blocking.
**Homework:** Given a scrambled snippet of `setTimeout`, `Promise.then`, `process.nextTick`, and sync logs — predict the output, then run it and explain any mismatch.

### Day 10 — 🛠️ Practice: CLI tool
**Topics:** Build a CLI tool end to end. Options: a **file organizer** (sort a folder's files into subfolders by extension) or a **note taker** (`add`, `list`, `read`, `remove` notes persisted to JSON). Parse `process.argv`, structure into modules, handle errors, add an npm script.
**Objective:** Combine modules, `fs`, and async/await into a working tool.
**Homework:** Finish the tool, add a `help` command, and push it to GitHub with a README.

---

## Week 3 — Express.js Fundamentals (Days 11–15)

### Day 11 — Express setup and routing
**Topics:** Why Express over raw `http`, `npm i express`, minimal server, `app.get` / `app.post` / `app.put` / `app.delete`, route paths, `res.send` vs `res.json` vs `res.status().json()`, running with nodemon, testing with Postman/Thunder Client.
**Objective:** Stand up an Express server and define multiple routes.
**Homework:** Rebuild Day 5's `http` server in Express and add POST/PUT/DELETE routes that return placeholder JSON.

### Day 12 — Params, queries, req/res
**Topics:** Route parameters `/users/:id` and `req.params`, query strings `?sort=asc&limit=10` and `req.query`, request body and `req.body`, `req.headers`, `res.status`, `res.set`, `res.redirect`, route order and how Express matches, `app.route()` chaining.
**Objective:** Read data out of every part of an incoming request.
**Homework:** Build `/products/:id` and `/products?category=x&limit=n` against a hard-coded array, returning filtered results.

### Day 13 — Middleware
**Topics:** What middleware is (`req`, `res`, `next`), the request pipeline, `express.json()` and `express.urlencoded()`, `express.static()`, writing a custom logger, application-level vs router-level vs route-specific middleware, order matters, third-party middleware (`morgan`).
**Objective:** Write custom middleware and explain the order the pipeline runs in.
**Homework:** Write a logger middleware printing method, URL, and timestamp, plus a middleware that blocks requests missing an `x-api-key` header.

### Day 14 — Error handling & responses
**Topics:** The 4-argument error handler `(err, req, res, next)`, `next(err)`, a 404 catch-all, HTTP status codes (200/201/204/400/401/403/404/409/500), a consistent JSON error shape, a custom `AppError` class, async errors and why `try/catch` is needed in handlers, wrapping with `express-async-handler`.
**Objective:** Return correct status codes and handle errors centrally instead of per-route.
**Homework:** Add a global error handler and 404 handler to your API; make every route return a consistent `{ success, data | error }` shape.

### Day 15 — 🛠️ Practice: REST API
**Topics:** Build a **Notes API** with an in-memory array — `GET /notes`, `GET /notes/:id`, `POST /notes`, `PUT /notes/:id`, `DELETE /notes/:id`. Cover REST conventions, resource naming, correct status codes, generating IDs, 404 for missing resources.
**Objective:** Ship a complete, conventional CRUD REST API.
**Homework:** Finish all five endpoints, test each in Postman, and save a Postman collection to the repo.

---

## Week 4 — Express + Project Structure (Days 16–20)

### Day 16 — MVC structure
**Topics:** Why a single `server.js` doesn't scale, separation of concerns, `express.Router()`, folder layout (`routes/`, `controllers/`, `models/`, `middleware/`, `config/`, `utils/`), splitting `app.js` from `server.js`, mounting routers with `app.use('/api/notes', notesRouter)`, moving handler logic into controllers.
**Objective:** Organize an Express app into routes, controllers, and models.
**Homework:** Split your Day 15 API into the folder structure above with no behavior change.

### Day 17 — Environment variables & config
**Topics:** Why secrets don't belong in code, `process.env`, `dotenv`, `.env` and `.env.example`, gitignoring `.env`, `PORT` / `NODE_ENV`, a central `config/index.js` that validates required vars, dev vs production behavior.
**Objective:** Move all configuration and secrets out of source code.
**Homework:** Move `PORT` and `NODE_ENV` into `.env`, add `.env.example`, and make the server exit with a clear message if a required variable is missing.

### Day 18 — Input validation
**Topics:** Never trust client input, validating in middleware vs controllers, `express-validator` (`body`, `param`, `validationResult`) *or* Joi schemas, common rules (required, length, email, type, enum), returning 400 with field-level errors, sanitization (`trim`, `escape`).
**Objective:** Reject invalid requests before they reach business logic.
**Homework:** Validate the create and update note routes — title required (3–100 chars), body optional (max 1000), and return structured field errors.

### Day 19 — CORS & basic security
**Topics:** Same-origin policy and why the browser blocks cross-origin calls, the `cors` package and configuring `origin`, preflight requests, `helmet` and the headers it sets, `express-rate-limit`, payload size limits, hiding `x-powered-by`, a quick pass on `npm audit`.
**Objective:** Apply baseline security middleware and enable a front end to call the API.
**Homework:** Add `cors`, `helmet`, and a rate limiter (100 requests / 15 min) to your API and verify the headers in Postman.

### Day 20 — 🛠️ Practice: Refactor
**Topics:** Consolidation day. Take the Day 15 API to production shape: MVC folders, `.env` config, validation on every write route, CORS + helmet + rate limiting, central error handling, consistent responses, a project README.
**Objective:** Produce a clean, well-structured backend ready for a database.
**Homework:** Finish the refactor and push. Every route must be tested in Postman.

---

## Week 5 — MongoDB & Mongoose (Days 21–25)

### Day 21 — MongoDB basics
**Topics:** SQL vs NoSQL, documents / collections / databases, BSON and `_id`, when a document model fits, MongoDB Atlas signup, creating a free M0 cluster, database user and IP allowlist, the connection string, browsing data in Atlas or MongoDB Compass, basic shell operations (`insertOne`, `find`, `updateOne`, `deleteOne`).
**Objective:** Create a cloud MongoDB cluster and insert/read documents manually.
**Homework:** Create an Atlas cluster, add a `notes` collection, insert five documents by hand, and try three different `find` filters.

### Day 22 — Mongoose connection, schemas, models
**Topics:** What an ODM is, `npm i mongoose`, `mongoose.connect` with async/await and error handling, connection events, putting the URI in `.env`, defining a `Schema` (types, `required`, `default`, `enum`, `unique`), `timestamps: true`, compiling a `Model`, singular vs pluralized collection names.
**Objective:** Connect an Express app to MongoDB and define a schema and model.
**Homework:** Connect your API to Atlas and create a `Note` model with `title`, `body`, `tags`, and timestamps.

### Day 23 — CRUD with Mongoose
**Topics:** `Model.create` / `new Model().save()`, `find`, `findById`, `findOne`, filters and operators (`$gt`, `$in`, `$regex`), `select`, `sort`, `limit`, `skip` (pagination), `findByIdAndUpdate` with `{ new: true, runValidators: true }`, `findByIdAndDelete`, `countDocuments`, handling an invalid `ObjectId` (`CastError`).
**Objective:** Perform every CRUD operation through Mongoose from controllers.
**Homework:** Replace all in-memory operations in your controllers with real Mongoose queries; add sorting and pagination to `GET /notes`.

### Day 24 — Validation & relationships
**Topics:** Schema-level validation (`min`, `max`, `minlength`, `match`, custom validators, custom messages), handling `ValidationError` in the error handler, unique index vs validation, referencing other documents with `ObjectId` + `ref`, `.populate()` and selective population, embedding vs referencing trade-offs, virtuals, schema methods.
**Objective:** Enforce data integrity at the model layer and link two collections.
**Homework:** Add a `User` model and a `user` ref on `Note`; return notes with the author populated (name and email only).

### Day 25 — 🛠️ Practice: Persist the API
**Topics:** Wire the whole Notes API to MongoDB — remove every array, verify all five endpoints, correct status codes, 404 on missing IDs, 400 on validation errors, seed script for sample data.
**Objective:** A fully database-backed REST API.
**Homework:** Finish the migration, write a `seed.js`, and confirm data persists across server restarts.

---

## Week 6 — Authentication (Days 26–30)

### Day 26 — Password hashing & signup
**Topics:** Why passwords are never stored in plain text, hashing vs encryption, `bcrypt` — salt rounds, `hash`, `compare`, hashing in a Mongoose `pre('save')` hook (and skipping when unmodified), `select: false` on the password field, building `POST /api/auth/register`, checking for duplicate emails (409), what to return (never the hash).
**Objective:** Register users with securely hashed passwords.
**Homework:** Build the register endpoint with validation, duplicate-email handling, and a response that excludes the password.

### Day 27 — JWT & login
**Topics:** Stateless auth vs sessions, JWT anatomy (header.payload.signature), `jsonwebtoken` — `sign` with a secret and `expiresIn`, what belongs in the payload (never secrets), `verify` and its error types, storing `JWT_SECRET` in `.env`, `POST /api/auth/login` — find user, compare password, sign token, generic "invalid credentials" for both failure modes.
**Objective:** Issue a signed JWT on successful login.
**Homework:** Build the login endpoint returning a token plus safe user fields; decode your token on jwt.io and inspect the payload.

### Day 28 — Auth middleware
**Topics:** The `Authorization: Bearer <token>` header, a `protect` middleware — extract, verify, look up the user, attach `req.user`, `next()`, 401 responses for missing/invalid/expired tokens, applying it per-route or to a whole router, scoping queries to `req.user._id` so users only see their own data.
**Objective:** Protect routes and tie resources to the authenticated user.
**Homework:** Protect all note routes; make `GET /notes` return only the current user's notes and block editing someone else's note (403).

### Day 29 — Roles, logout, token expiry
**Topics:** A `role` field with an enum, an `authorize(...roles)` middleware factory, 403 vs 401, `GET /api/auth/me`, logout in a stateless world (client discards the token) vs a server-side denylist, short-lived access tokens and refresh tokens (concept + simple implementation), httpOnly cookies vs localStorage trade-offs.
**Objective:** Restrict routes by role and handle token lifecycle correctly.
**Homework:** Add an `admin` role and an admin-only `GET /api/users`; add `/me`; set token expiry to 1h and verify the 401 after expiry.

### Day 30 — 🛠️ Backend capstone
**Topics:** Assemble the complete backend: register, login, `/me`, protected user-scoped CRUD, roles, validation, error handling, security middleware, env config, MVC structure, README with endpoint documentation.
**Objective:** A production-shaped, authenticated REST API — the backend deliverable.
**Homework:** Finish, document every endpoint in the README, export a Postman collection, and push.

---

## Week 7 — React Fundamentals (Days 31–35)

### Day 31 — React & JSX
**Topics:** Why component-based UI, the virtual DOM and declarative rendering, `npm create vite@latest` with the React template, project tour (`index.html`, `main.jsx`, `App.jsx`), the dev server and HMR, JSX rules — one root element, `className`, `{expression}`, self-closing tags, comments, inline styles as objects.
**Objective:** Scaffold a React app and write valid JSX.
**Homework:** Create a Vite React app and build a static profile card page in `App.jsx` with JSX-embedded variables.

### Day 32 — Components and props
**Topics:** Function components, naming and file conventions, importing/exporting components, composing components, props and one-way data flow, destructuring props, `children`, default values, passing arrays/objects/functions as props, props are read-only, `.map()` to render a list (keys previewed).
**Objective:** Break a UI into reusable components communicating via props.
**Homework:** Build a `<Card />` component and render six cards from an array of objects using `.map()`.

### Day 33 — State and events
**Topics:** Why props aren't enough, `useState` — the array destructuring pattern, initial values, state updates trigger re-renders, updater functions (`setCount(c => c + 1)`), event handlers (`onClick`, `onChange`), passing handlers to children, immutable updates for arrays and objects (spread), lifting state up, multiple state variables vs one object.
**Objective:** Manage local state and respond to user events.
**Homework:** Build a counter with increment/decrement/reset, and a to-do list with add and delete (state only, no persistence).

### Day 34 — useEffect
**Topics:** What a side effect is, `useEffect(fn, deps)`, the three dependency-array forms (none / `[]` / `[deps]`), the cleanup function and when it runs, fetching data with `fetch`/`axios` inside an effect, `loading` and `error` state, why the effect body can't be `async`, infinite-loop pitfalls, `AbortController` for cancelled requests.
**Objective:** Run side effects at the right time and fetch data into a component.
**Homework:** Fetch from a public API (e.g. JSONPlaceholder), render the results, and show loading and error states.

### Day 35 — 🛠️ Practice: React app with mock data
**Topics:** Build a small app on static/mock data — a product list, movie catalog, or contact directory. Component breakdown, props drilling, state for search/filter, `useEffect` on mount, empty states.
**Objective:** Combine components, props, state, and effects into a working UI.
**Homework:** Finish the app with a working search filter and a category/tag filter.

---

## Week 8 — React Forms, Routing, Styling (Days 36–40)

### Day 36 — Forms
**Topics:** Controlled vs uncontrolled inputs, `value` + `onChange`, one state object for a whole form with a shared handler (`[e.target.name]: e.target.value`), `onSubmit` and `e.preventDefault()`, textareas, selects, checkboxes and radios, client-side validation, per-field error state, disabling submit while pending, resetting after submit.
**Objective:** Build validated, controlled forms.
**Homework:** Build a registration form (name, email, password, confirm password) with validation messages and a submit that logs the payload.

### Day 37 — React Router
**Topics:** SPA routing vs server routing, `npm i react-router-dom`, `BrowserRouter` / `Routes` / `Route`, `Link` and `NavLink` (and why not `<a>`), dynamic routes `/products/:id` and `useParams`, `useNavigate` for programmatic navigation, nested routes and `Outlet` for shared layouts, a `*` 404 route, `useLocation`, query params via `useSearchParams`.
**Objective:** Build a multi-page SPA with dynamic and nested routes.
**Homework:** Add Home, About, Products, Product Detail (`/products/:id`), and a 404 page, with a shared nav bar via a layout route.

### Day 38 — Rendering patterns
**Topics:** Conditional rendering (`&&`, ternary, early return), rendering lists with `.map()`, why keys matter and why index keys are risky, fragments (`<>`), component composition and `children`, container vs presentational split, extracting a reusable `<Loader />` / `<EmptyState />` / `<ErrorMessage />`, conditional class names.
**Objective:** Render dynamic UI cleanly and avoid common list/key bugs.
**Homework:** Refactor Day 35's app to use shared Loader, Empty, and Error components and proper stable keys.

### Day 39 — Styling with Tailwind
**Topics:** Styling options in React (CSS files, CSS modules, utility-first), installing Tailwind in a Vite project, config and content paths, core utilities — spacing, colors, typography, flex, grid, borders, shadows, rounding, responsive prefixes (`sm:`/`md:`/`lg:`), hover/focus states, dark mode, extracting repeated utility strings into components, `clsx` for conditional classes.
**Objective:** Style a React app quickly with utility classes.
**Homework:** Restyle Day 37's app with Tailwind — responsive nav, card grid, and styled form controls.

### Day 40 — 🛠️ Practice: Multi-page front end
**Topics:** Build the complete client UI on mock data — listing page with search/filter, detail page via dynamic route, form page, shared layout and nav, responsive Tailwind styling, loading and empty states.
**Objective:** A polished, responsive multi-page React front end.
**Homework:** Finish and deploy a preview build to Vercel or Netlify (static, no backend yet).

---

## Week 9 — Integration & Deployment (Days 41–45)

### Day 41 — Calling your API
**Topics:** `fetch` vs `axios`, installing axios, a central `api.js` instance with `baseURL` from `import.meta.env.VITE_API_URL`, Vite env variables and the `VITE_` prefix, a `services/` layer of API functions, `loading` / `error` / `data` state, `try/catch/finally`, reading server error messages, CORS errors and fixing them on the server, optional custom `useFetch` hook.
**Objective:** Replace mock data with live data from your own Express API.
**Homework:** Point the front end at your local API and make the listing and detail pages load real data.

### Day 42 — Auth flow in React
**Topics:** Login and register pages posting to `/api/auth`, storing the JWT (localStorage vs httpOnly cookie — trade-offs), an axios request interceptor attaching `Authorization: Bearer`, a response interceptor that redirects on 401, a `ProtectedRoute` wrapper component, redirecting after login with `useNavigate`, logout (clear token + state), persisting login across refresh.
**Objective:** Implement end-to-end login, token storage, and route protection.
**Homework:** Build login + register pages, protect the notes pages, and keep the user logged in after a refresh.

### Day 43 — Context API
**Topics:** Prop drilling and why it hurts, `createContext` / `Provider` / `useContext`, building an `AuthContext` holding `user`, `token`, `login`, `logout`, `loading`, a `useAuth()` custom hook, wrapping the app in `main.jsx`, initializing state from localStorage, when Context is the right tool vs when to reach for a state library.
**Objective:** Share auth state globally without prop drilling.
**Homework:** Move all auth state into `AuthContext`, consume it via `useAuth()` in the nav bar and protected routes, and delete the drilled props.

### Day 44 — 🛠️ Full integration
**Topics:** Wire the Week 6 backend to the Week 8 front end — full CRUD against real endpoints, user-scoped data, optimistic vs refetch-after-mutate updates, surfacing server validation errors on form fields, 401/403 handling, empty and loading states, final polish.
**Objective:** A working full-stack application running locally.
**Homework:** Every feature works end to end: register → login → create → read → update → delete → logout.

### Day 45 — Deployment
**Topics:** Dev vs production builds, `npm run build` and the `dist/` folder, deploying the API to Render or Railway (repo connect, build/start commands, environment variables, `process.env.PORT`), Atlas IP allowlist for the host, deploying the front end to Vercel or Netlify with `VITE_API_URL` set to the live API, updating server CORS to the deployed origin, common production failures (CORS, missing env vars, SPA rewrite rules for client routing), final demos.
**Objective:** Ship a live, publicly accessible full-stack app.
**Homework:** Submit both live URLs and the GitHub repo link with a complete README.

---

## Instructor notes

- **50-minute shape:** ~10 min recap/homework review · ~25 min new concept with live coding · ~15 min guided exercise. Practice days flip to ~5 min brief and ~45 min building.
- **Type, don't paste.** Students code along in every session.
- **Push daily.** A commit per class makes progress and blockers visible.
- **Practice days are buffers.** If a week runs long, absorb the overflow there rather than skipping content.
- **Common sticking points:** async ordering (Day 9), middleware order (Day 13), `this`/callbacks in Mongoose hooks (Day 26), `useEffect` dependency arrays (Day 34), and CORS (Days 19, 41, 45). Budget extra time there.
- **Days 41–45 depend on a working Day 30 backend.** Students who are behind should catch up over the Week 8 weekend.
