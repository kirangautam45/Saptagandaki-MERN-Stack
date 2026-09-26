# MERN Stack — 45-Day Course

**A free, open-source curriculum that takes you from zero Node.js to a deployed full-stack MERN app in 45 classes.**

[![GitHub stars](https://img.shields.io/github/stars/kirangautam45/Saptagandaki-MERN-Stack?style=social)](https://github.com/kirangautam45/Saptagandaki-MERN-Stack/stargazers)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#contributing)
![Stack](https://img.shields.io/badge/stack-MongoDB%20%C2%B7%20Express%20%C2%B7%20React%20%C2%B7%20Node-blue)

> ⭐ **If this course helps you learn or teach, please star the repo** — it helps other students find it.

**Jump to:** [What's in this repo](#whats-in-this-repo) · [Day-by-day topics](TOPICS.md) · [Course structure](#course-structure) · [Contributing](#contributing)

## What's in this repo

| Folder | What it is | Stack |
|---|---|---|
| [`day-01-backend/`](day-01-backend) | Beginner Notes API — full CRUD with in-memory data, split into routes, controllers and data | Node · Express |
| [`helpdesk-api/`](helpdesk-api) | Support-ticket backend with sign-up, login and protected routes | Express · MongoDB · Mongoose · JWT |
| [`helpdesk-client/`](helpdesk-client) | React front end for the helpdesk API with auth context and protected pages | React · Vite · Axios |
| [`TOPICS.md`](TOPICS.md) | Full 45-day plan: objectives, teaching notes and homework for every class | — |

### Quick start

```bash
git clone https://github.com/kirangautam45/Saptagandaki-MERN-Stack.git
cd Saptagandaki-MERN-Stack

# Beginner Notes API (no database needed)
cd day-01-backend && npm install && npm run dev
```

To run the full-stack helpdesk app, start the API first, then the client:

```bash
cd helpdesk-api && npm install && cp .env.example .env && npm run dev      # set MONGO_URI and JWT_SECRET in .env
cd helpdesk-client && npm install && cp .env.example .env && npm run dev   # in a second terminal
```

## About the course

A 45-day, class-paced course that goes from zero Node.js to a deployed full-stack MERN application. Each day is sized for a **50-minute class** (roughly 35 min teaching + 15 min live coding / Q&A), with homework carrying the rest.

- **Duration:** 45 classes (~9 weeks at 5 classes/week)
- **Format:** 50 minutes per class
- **Stack:** MongoDB · Express.js · React · Node.js
- **Outcome:** A deployed, authenticated full-stack app built by each student

## Prerequisites

Students should already be comfortable with:

- HTML and CSS basics
- JavaScript syntax: variables, functions, arrays, objects, loops, conditionals
- Basic terminal usage (`cd`, `ls`, `mkdir`)

> **Not required:** ES6+ deep dives, async JS, or any backend experience — those are taught here.
>
> If your students are complete JavaScript beginners, insert 3–5 days of ES6+ review (`let`/`const`, arrow functions, destructuring, spread/rest, array methods, modules) before Day 1 and slide everything back.

## What students will have built by Day 45

| Milestone | Day | Description |
|---|---|---|
| CLI tool | 10 | A file organizer / note-taker built on `fs` and async JS |
| REST API (in-memory) | 15 | Notes API with full CRUD using Express |
| Structured API | 20 | Same API refactored into MVC with validation and config |
| Persistent API | 25 | Backed by MongoDB Atlas via Mongoose |
| **Backend capstone** | 30 | Full JWT auth, hashed passwords, protected routes |
| React front end | 40 | Multi-page UI with routing, forms, and Tailwind |
| **Final project** | 45 | Front end + back end integrated and deployed live |

## Course structure

| Week | Days | Focus |
|---|---|---|
| 1 | 1–5 | Node.js basics |
| 2 | 6–10 | Async JavaScript + core Node concepts |
| 3 | 11–15 | Express.js fundamentals |
| 4 | 16–20 | Express + project structure |
| 5 | 21–25 | MongoDB & Mongoose |
| 6 | 26–30 | Authentication |
| 7 | 31–35 | React fundamentals |
| 8 | 36–40 | React forms, routing, styling |
| 9 | 41–45 | Connecting React to the backend + deployment |

Full day-by-day breakdown with objectives and homework: **[TOPICS.md](TOPICS.md)**

Every fifth day is a **practice day** — no new theory, students build and the instructor circulates.

## Tooling

| Tool | Version / Notes |
|---|---|
| Node.js | 20 LTS or newer |
| npm | Ships with Node |
| VS Code | With ESLint + Prettier extensions |
| MongoDB Atlas | Free M0 shared cluster |
| Postman or Thunder Client | For testing API routes |
| Git + GitHub | Students push work daily |

### Day 1 setup checklist

```bash
node --version      # v20.x or newer
npm --version
git --version
```

Accounts to create before Day 21: [MongoDB Atlas](https://www.mongodb.com/atlas), [Render](https://render.com) or [Railway](https://railway.app), [Vercel](https://vercel.com) or [Netlify](https://netlify.com).

## Suggested repository layout

Students keep one repo for the whole course:

```
mern-course/
├── week-01/            # daily scripts and exercises
├── week-02/
├── ...
├── notes-api/          # the backend built from Day 15 onward
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── app.js
│   ├── .env.example
│   └── server.js
└── notes-client/       # the React front end built from Day 31 onward
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── context/
    │   ├── services/
    │   └── App.jsx
    └── index.html
```

## Assessment

| Component | Weight |
|---|---|
| Daily homework completion | 20% |
| Practice-day builds (Days 10, 15, 20, 25, 35, 40) | 20% |
| Backend capstone (Day 30) | 25% |
| Final deployed project (Day 45) | 35% |

## Scope notes

Deliberately **out of scope** to fit 45 classes:

- Deep vanilla JS fundamentals (assumed prerequisite)
- MongoDB aggregation pipelines, indexing strategy, transactions
- Testing (Jest, Supertest, React Testing Library)
- TypeScript
- Redux / advanced state management (Context API is covered instead)
- Docker, CI/CD pipelines, WebSockets

Each of these is a natural follow-on module if the course is extended.

## Contributing

Found a typo, a bug in the example code, or have an idea for a better exercise? Contributions are welcome:

1. Fork the repo and create a branch: `git checkout -b fix/day-12-typo`
2. Make your change and commit it with a clear message
3. Open a pull request describing what you changed and why

Teachers using this course: open an issue to share what worked in your class and what didn't.

## License

Released under the [MIT License](LICENSE) — free to use, adapt and teach from. Attribution is appreciated.

---

<p align="center">Made with ❤️ by <a href="https://github.com/kirangautam45">Kiran Gautam</a> · <a href="https://kirangtm.com.np/">kirangtm.com.np</a><br>⭐ Star the repo if you found it useful!</p>
