# Deploying Atelier

The project is two parts:

- **Frontend** (`client/`) — static Vite build → this gives you the public link.
- **Backend** (`server/`) — Express API; only the contact form needs it. The
  projects/services lists have built-in fallbacks, so the site looks complete
  even if the backend isn't deployed.

## Step 0 — Push to GitHub (required by all hosts)
```bash
cd /home/mahadev/Documents/Interior_Design
git add -A
git commit -m "Atelier interior design site"
gh repo create atelier-site --public --source=. --push   # or create the repo on github.com and: git push -u origin main
```

---

## Recommended: Vercel (frontend) + Render (backend)

### A. Frontend on Vercel  → your live link
1. Go to **vercel.com** → sign in with GitHub → **Add New… → Project** → import this repo.
2. **Root Directory:** set to `client`  ← important (monorepo).
3. Framework preset auto-detects **Vite**. Build = `npm run build`, Output = `dist`.
4. (Optional) Add env var `VITE_API_URL` = your Render backend URL once you have it (step B).
5. **Deploy.** You get `https://your-project.vercel.app`.

### B. Backend on Render  (only needed for the contact form)
1. Go to **render.com** → **New + → Web Service** → connect this repo.
2. **Root Directory:** `server`, **Build:** `npm install`, **Start:** `npm start`.
   (Or use **New + → Blueprint** — it reads the included `render.yaml` automatically.)
3. Deploy → you get `https://atelier-api.onrender.com`.
4. Back in Vercel, set `VITE_API_URL` to that URL and redeploy the frontend.

> Render's free tier sleeps after inactivity; the first contact-form request may
> take ~30s to wake it. Fine for a portfolio.

---

## Simplest: Netlify (frontend only, fastest link)
The repo includes `netlify.toml`, so:
1. **netlify.com** → **Add new site → Import an existing project** → pick the repo.
2. Settings are auto-filled (base `client`, publish `dist`). **Deploy.**
3. You get `https://your-site.netlify.app` in ~2 minutes.

The site is fully browsable; the contact form just won't send until you also
deploy the backend (Render, above) and set `VITE_API_URL`.

---

## Test the production build locally first
```bash
npm --prefix client run build
npm --prefix client run preview   # serves the built site on http://localhost:4173
```
