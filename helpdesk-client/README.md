# Helpdesk Frontend

React (Vite) client for the [helpdesk-api](../helpdesk-api) backend.

## Setup

```bash
npm install
cp .env.example .env   # VITE_API_URL=http://localhost:5002
npm run dev
```

Start `helpdesk-api` first, then register an account in the browser.

## What's here

- `src/api/client.js`: axios instance that sends the token
- `src/api/auth.js`, `src/api/tickets.js`: one function per API endpoint
- `src/context/AuthContext.jsx`: login, register, logout
- `src/components/ProtectedRoute.jsx`: redirects to login if not signed in
- `src/pages/`: Login, Register, TicketList, CreateTicket, TicketDetail
