# Day 02 — Notes API with MongoDB

Same Notes API as `backend`, but notes are saved in MongoDB, so they survive a restart.

## Run it

1. Start MongoDB locally — `brew services start mongodb-community` or `docker run -d -p 27017:27017 mongo`. On Windows, see [Install MongoDB on Windows](#install-mongodb-on-windows).
2. Install and configure:
   ```bash
   npm install
   cp .env.example .env
   ```
   In Windows Command Prompt use `copy .env.example .env` instead.
3. `npm run dev` — you should see `MongoDB connected` and the server URL.
4. Open http://localhost:4002 — it should show `{"status":"ok","database":"connected"}`.

## Install MongoDB on Windows

1. Download the **MongoDB Community Server** `.msi` from https://www.mongodb.com/try/download/community (Platform: Windows, Package: msi).
2. Run the installer and pick **Complete**.
3. Leave **Install MongoD as a Service** ticked — MongoDB then starts by itself every time Windows boots.
4. Leave **Install MongoDB Compass** ticked to get the GUI too. If you skipped it, download Compass from https://www.mongodb.com/try/download/compass.
5. Check it's running: open PowerShell and run `Get-Service MongoDB` — Status should be `Running`. If not, run `Start-Service MongoDB` from an admin PowerShell.

## Look at your data in Compass

1. Open MongoDB Compass and connect to `mongodb://127.0.0.1:27017`.
2. After creating a note, open the `notes` database → `notes` collection to see it.
3. You can edit or delete documents there and see the change in `GET /api/notes`.

## Try it

```bash
curl -X POST localhost:4002/api/notes -H 'Content-Type: application/json' -d '{"title":"Hello","body":"Saved in Mongo"}'
curl localhost:4002/api/notes
curl localhost:4002/api/notes/<id>
curl -X PUT localhost:4002/api/notes/<id> -H 'Content-Type: application/json' -d '{"title":"Updated"}'
curl -X DELETE localhost:4002/api/notes/<id>
```

Restart the server and list the notes again — they're still there.

## What changed from day 01

- `src/database/db.js` connects to MongoDB using `MONGO_URI` from `.env`
- `src/models/Note.js` replaces the in-memory array
- Controllers are `async` and use `Note.find`, `Note.create`, etc.
- Ids are MongoDB `_id` strings instead of numbers
