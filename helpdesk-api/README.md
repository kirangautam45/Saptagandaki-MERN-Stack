# Helpdesk API

A simple backend where users sign up, log in, and manage their own support tickets.
Built with Express, MongoDB (Mongoose) and JWT.

## Setup

```bash
npm install
cp .env.example .env   # set MONGO_URI and JWT_SECRET
npm run dev
```

## Folders

- `server.js`: starts Express and connects to MongoDB
- `models/`: the User and Ticket schemas
- `middleware/auth.js`: checks the JWT token
- `controllers/`: the logic for each endpoint
- `routes/`: connects URLs to controller functions

## Endpoints

| Method | URL | What it does |
|---|---|---|
| POST | `/api/auth/register` | create account, returns token |
| POST | `/api/auth/login` | log in, returns token |
| GET | `/api/tickets` | list my tickets |
| POST | `/api/tickets` | create a ticket `{ title, description }` |
| GET | `/api/tickets/:id` | get one ticket |
| PUT | `/api/tickets/:id` | update `{ title, description, status }` |
| DELETE | `/api/tickets/:id` | delete a ticket |

Ticket routes need the header `Authorization: Bearer <token>`.
Status can be `Open`, `In Progress` or `Closed`.
