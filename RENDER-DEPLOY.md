# Deploy: Neon (Postgres) + Render (API + Frontend)

Stack: React frontend (Vite static site) + Express API, both on **Render**;
Postgres database on **Neon**. Contact-form submissions are saved to Postgres.

---

## Step 1 — Create the Neon database
1. Go to **neon.tech** → sign up / log in → **Create project** (any name, e.g. `onyx`).
2. Open **Connection Details** → copy the **connection string**. It looks like:
   ```
   postgresql://user:pass@ep-xxxx.region.aws.neon.tech/neondb?sslmode=require
   ```
   Keep it handy — that's your `DATABASE_URL`.
3. (Optional) The `contacts` table is created automatically when the API boots,
   so you don't need to run any SQL. (`server/schema.sql` is there if you want to.)

## Step 2 — Push the code to GitHub
```bash
cd /home/mahadev/Documents/Interior_Design
git add -A
git commit -m "Postgres-backed contact form; Render blueprint (drop Vercel)"
git push
```

## Step 3 — Deploy on Render (Blueprint = both services at once)
1. Go to **render.com** → log in → **New + → Blueprint**.
2. Connect the GitHub repo **InteriorDesignServiceWebsite**. Render reads
   `render.yaml` and shows two services: **onyx-api** (Node) and **onyx-web** (static).
3. Click **Apply** to create them. The first build will pause for the secrets below.

### Set the secrets
- **onyx-api** → Environment → `DATABASE_URL` = your Neon connection string (Step 1).
  - `ADMIN_TOKEN` is auto-generated — copy its value if you want to view enquiries later.
- Trigger a deploy of **onyx-api**. When it's live, copy its URL
  (e.g. `https://onyx-api.onrender.com`).
- **onyx-web** → Environment → `VITE_API_URL` = that API URL → **Manual Deploy**
  (the frontend bakes this in at build time, so it must redeploy after you set it).

## Step 4 — Verify
- API health: open `https://onyx-api.onrender.com/api/health` → `{"ok":true,"db":true}`.
- Frontend: open the `onyx-web` URL → submit the contact form → you should see the
  thank-you message.
- Confirm it saved: open
  `https://onyx-api.onrender.com/api/contacts?token=YOUR_ADMIN_TOKEN`
  → JSON list of submissions. (Or check the table in Neon's SQL editor:
  `SELECT * FROM contacts ORDER BY created_at DESC;`)

---

## Notes
- **Free tier:** Render's free web service sleeps after ~15 min idle; the first
  request after that takes ~30–50s to wake. Fine for a portfolio.
- **Local dev with the DB:** create `server/.env` from `server/.env.example`, put your
  Neon `DATABASE_URL` in it, then `npm --prefix server run dev`.
- **Vercel removed:** `vercel.json` files were deleted. If a Vercel project still
  exists for this repo, delete it in the Vercel dashboard so it stops auto-deploying.
- **Security:** rotate any password/secret that was shared in plain text.
