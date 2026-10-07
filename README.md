# Node.js, Express & React Full-Stack Development

**BCA 6th Semester · 50 hours** (40 hrs Node.js/Backend + 10 hrs React/Frontend)

Students learn to build server-side applications, REST APIs backed by a database, and a React frontend that uses those APIs. By the end, each student has a complete full-stack app of their own.

The course is **coding-first**. Every module has three parts:

1. **Class projects:** 3 backend projects and 1 frontend project, all built on the MERN stack. The instructor builds them live and students code along.
2. **Labs:** short tasks students code on their own after each module.
3. **Final project:** each student builds their own full-stack app.

## Modules

| # | Module | Hours | Track |
|---|---|---|---|
| 1 | Introduction & Core Concepts | 8 | Node.js |
| 2 | Express.js Fundamentals | 8 | Node.js |
| 3 | Database Integration & Authentication | 12 | Node.js |
| 4 | Advanced Topics & Deployment | 12 | Node.js |
| 5 | React.js Fundamentals & API Integration | 10 | React |
| | **Total** | **50** | |

### 1. Introduction & Core Concepts (8 hrs)
- What Node.js is and why use it; installing Node.js and npm
- Directory structure overview
- Event-driven architecture and the event loop
- Asynchronous programming: callbacks, promises, async/await
- File system operations with `fs`

### 2. Express.js Fundamentals (8 hrs)
- Setting up an Express server
- Routing and request handling (GET, POST, PUT, DELETE)
- Middleware and error handling
- RESTful API concepts

### 3. Database Integration & Authentication (12 hrs)
- MongoDB setup, CRUD, and Mongoose
- Database migrations and seeders
- Registration, login, and password hashing with bcrypt
- JWT authentication
- Role-based access control

### 4. Advanced Topics & Deployment (12 hrs)
- Building RESTful APIs
- API documentation with Swagger
- Real-time communication with Socket.io
- Unit tests with Mocha and Chai
- Debugging and logging
- Cloud hosting and deployment from GitHub

### 5. React.js Fundamentals & API Integration (10 hrs)
- Components, JSX, props, and state (Vite)
- Events and forms
- Hooks: `useState`, `useEffect`
- Client-side routing with React Router
- Calling the backend with fetch/axios
- Storing and using a JWT on the frontend

## Class projects

Everything uses the MERN stack: **MongoDB, Express, React, Node.js**. Module 1 has no project, only labs, because students first need to learn Node basics and async code.

### Backend (3 projects)

| # | Project | Modules | Hours | What it teaches |
|---|---|---|---|---|
| 1 | **Notes API** | 2 → 3 | ~14 | Express, routing, middleware, error handling, then MongoDB + Mongoose, bcrypt, JWT, and roles |
| 2 | **Library API** | 3 | ~6 | Several related models (Book, Member, Loan), `populate`, validation, seed scripts |
| 3 | **Helpdesk API** | 4 | ~12 | A complete API: auth and roles, Swagger, Socket.io, Mocha + Chai tests, logging, deployment |

**Notes API** is built up in steps:

| Step | What gets added |
|---|---|
| Module 2 | REST API with Express: full CRUD, logger middleware, validation middleware, central error handler. Data kept in memory |
| Module 3 | MongoDB + Mongoose, `User` model, register/login with bcrypt, JWT middleware, users see only their own notes, `admin` role sees all notes |

**Library API** rules to code: a member can have at most 3 books on loan, and a book can't be lent out while it's already on loan.

### Frontend (1 project)

**Helpdesk Client** (React + Vite), which connects to Helpdesk API. It ends the course with one complete app, from the API to the UI.

| Hours | What gets built |
|---|---|
| 2 | Vite setup, JSX, components, props. A static ticket list |
| 2 | State, events, forms. A "new ticket" form |
| 2 | `useEffect` and axios. Load and create tickets through the API |
| 2 | React Router: list, detail, login and register pages |
| 2 | Store the JWT, protected routes, logout, and live updates over Socket.io |

## Labs

Short tasks (1–3 hours each) with a clear spec. Students write them alone.

### Module 1: Node core
- **Word counter CLI:** read a `.txt` file and print words, lines, and the top 10 most-used words
- **File organizer:** sort the files in a folder into subfolders by extension
- **Log watcher:** use `fs.watch` and an `EventEmitter` to print new lines added to a log file
- **Async drill:** fetch 3 URLs one after another, then in parallel with `Promise.all`, and compare the times

### Module 2: Express
- **Student Records API:** in-memory CRUD with filters (`?semester=6&sort=name`) and pagination
- **URL shortener:** `POST /shorten`, and `GET /:code` redirects and counts the visit
- **Middleware drill:** write `requestTimer`, `apiKeyCheck`, and `rateLimiter` yourself, without libraries

### Module 3: Database + Auth
- **Recipe API:** Recipe, Category, and Review models with `populate`. Each recipe shows its average rating, and a user can review a recipe only once
- **Auth drill:** register, login, `/me`, change password, and `student`/`teacher`/`admin` roles with an `authorize()` middleware

### Module 4: Advanced
- **Chat room:** Socket.io rooms, "user is typing…", list of online users
- **Testing lab:** start from a buggy API with Mocha + Chai tests already written, and fix the code until every test passes
- **Document it:** add Swagger to your Module 3 lab

### Module 5: React
- **Frontend for a backend lab:** list, create, edit, and delete pages for your Module 2 or 3 API
- **Login flow:** store the JWT, add a `PrivateRoute` and logout, and send the user back to login on a 401

## Final project

Each student builds their own full-stack app, supervised by the lecturer. It must include:

- A Node.js/Express backend with authentication, roles, REST endpoints, and a database
- A React frontend that uses the API and keeps track of who is logged in
- At least 5 passing Mocha + Chai tests
- A Swagger page
- Deployment on a cloud host, with the code on GitHub

### Suggested topics

| Project | Roles | Extra feature |
|---|---|---|
| College Helpdesk / Ticket System | student, staff, admin | Live ticket status (Socket.io) |
| Library Management | member, librarian | Due-date fines, search |
| Event Booking (college fest) | user, organizer | Seat limits, live booking count |
| Online Quiz / Exam Portal | student, teacher | Timed quiz, auto-grading |
| Hostel / Mess Management | student, warden | Complaint tracking, menu voting |
| Job / Internship Portal | seeker, employer, admin | Applications, file upload (multer) |
| Restaurant Ordering | customer, kitchen, admin | Live order queue |
| Expense Splitter | user, group admin | Who-owes-whom calculation |
| Blood Bank / Donor Finder | donor, hospital, admin | Filter by blood group and location |
| Kanban Task Board | member, project owner | Live drag-and-drop updates |
| Doctor Appointment Booking | patient, doctor, admin | Double-booking checks |
| Mini E-commerce | buyer, seller, admin | Cart, stock checks, order status |

### Rules
- Each student takes a different topic, or a different twist on a shared one
- Commit every week. The Git history counts toward the grade
- Viva: students make a live code change, such as adding a field or an endpoint on the spot

## What's in this repo

| Folder | What it is |
|---|---|
| [backend/](backend/) | Notes API with Express, data kept in memory (Module 2) |
| [notes-api/](notes-api/) | The same Notes API using MongoDB and Mongoose (Module 3) |
| [helpdesk-api/](helpdesk-api/) | Helpdesk API (Module 4), also the example for the final project |
| [helpdesk-client/](helpdesk-client/) | Helpdesk Client in React (Module 5) |
| [notes-android/](notes-android/) | Extra: Java Android client for the Notes API |

Session-by-session teaching notes for each module: [TOPICS.md](TOPICS.md)

## Tooling

| Tool | Notes |
|---|---|
| Node.js | 20 LTS or newer (npm comes with it) |
| VS Code | ESLint + Prettier extensions |
| MongoDB Atlas | Free M0 cluster |
| Postman / Thunder Client | For testing API routes |
| Git + GitHub | Students push their work every class |

Accounts to create before Module 3: [MongoDB Atlas](https://www.mongodb.com/atlas), [Render](https://render.com) or [Railway](https://railway.app), [Vercel](https://vercel.com) or [Netlify](https://netlify.com).

```bash
node --version   # v20.x or newer
npm --version
git --version
```

## Assessment

| Component | Weight |
|---|---|
| Labs | 25% |
| Class project checkpoints | 15% |
| Final project: code, tests, and deployment | 45% |
| Final project viva (live code change) | 15% |

## References
- [Node.js docs](https://nodejs.org/docs)
- [Express docs](https://expressjs.com)
- [React docs](https://react.dev)
- [Mongoose docs](https://mongoosejs.com/docs)
- [Socket.io docs](https://socket.io/docs)




**Backend (3 projects, all MongoDB)**

| # | Project | Modules | Hours |
|---|---|---|---|
| 1 | **Notes API**: Express CRUD first, then Mongoose, bcrypt, JWT and roles | 2 → 3 | ~14 |
| 2 | **Library API**: Book, Member and Loan models with `populate`, rules like "max 3 books on loan", seed scripts | 3 | ~6 |
| 3 | **Helpdesk API**: auth, roles, Swagger, Socket.io, Mocha + Chai tests, deployment | 4 | ~12 |

**Frontend (1 project)**
- **Helpdesk Client** (React + Vite), connected to Helpdesk API. The README breaks its 10 hours into 5 two-hour steps.



