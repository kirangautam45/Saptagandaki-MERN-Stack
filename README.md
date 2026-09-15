# MERN Stack — 45-Day Course

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
