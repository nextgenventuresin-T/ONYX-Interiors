import express from "express";
import cors from "cors";
import { projects, services } from "./data/projects.js";
import {
  initDb, saveContact, getContacts, hasDb,
  getFlats, createFlat, updateFlat, deleteFlat,
} from "./db.js";
import { notifyWhatsApp } from "./notify.js";

// Admin auth: a request is authorised if it carries the ADMIN_TOKEN.
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || "onyx-dev-token";
const ADMIN_USER = process.env.ADMIN_USER || "admin";
const ADMIN_PASS = process.env.ADMIN_PASS || "onyx@123";

function requireAdmin(req, res, next) {
  const token = req.get("x-admin-token") || req.query.token;
  if (token !== ADMIN_TOKEN) {
    return res.status(401).json({ ok: false, error: "Unauthorized" });
  }
  next();
}

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => res.json({ ok: true, db: hasDb }));

app.get("/api/projects", (_req, res) => res.json(projects));
app.get("/api/services", (_req, res) => res.json(services));

// Contact / enquiry endpoint — saves each submission to Postgres.
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: "Missing fields." });
  }
  try {
    const enquiry = {
      name: String(name).trim(),
      email: String(email).trim(),
      message: String(message).trim(),
    };
    const saved = await saveContact(enquiry);
    console.log("New enquiry saved:", saved.id ?? "(no-db)");
    // Fire-and-forget WhatsApp notification (never blocks the response).
    notifyWhatsApp(enquiry).catch(() => {});
    res.json({ ok: true, message: "Thank you — we'll be in touch shortly." });
  } catch (err) {
    console.error("Failed to save enquiry:", err.message);
    res.status(500).json({ ok: false, error: "Something went wrong. Please try again." });
  }
});

// ---------- Admin auth ----------
app.post("/api/admin/login", (req, res) => {
  const { username, password } = req.body || {};
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    return res.json({ ok: true, token: ADMIN_TOKEN });
  }
  res.status(401).json({ ok: false, error: "Invalid username or password." });
});

// Admin: view stored enquiries.  GET /api/contacts  (x-admin-token header or ?token=)
app.get("/api/contacts", requireAdmin, async (_req, res) => {
  try {
    const rows = await getContacts(200);
    res.json({ ok: true, count: rows.length, contacts: rows });
  } catch (err) {
    console.error("Failed to read enquiries:", err.message);
    res.status(500).json({ ok: false, error: "Could not read enquiries." });
  }
});

// ---------- Flats (public read, admin write) ----------
app.get("/api/flats", async (_req, res) => {
  try {
    res.json(await getFlats());
  } catch (err) {
    console.error("Failed to read flats:", err.message);
    res.json([]); // graceful: frontend falls back to its static list
  }
});

app.post("/api/flats", requireAdmin, async (req, res) => {
  try {
    if (!req.body?.title) return res.status(400).json({ ok: false, error: "Title is required." });
    res.json({ ok: true, flat: await createFlat(req.body) });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

app.put("/api/flats/:id", requireAdmin, async (req, res) => {
  try {
    const flat = await updateFlat(req.params.id, req.body || {});
    if (!flat) return res.status(404).json({ ok: false, error: "Flat not found." });
    res.json({ ok: true, flat });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

app.delete("/api/flats/:id", requireAdmin, async (req, res) => {
  try {
    await deleteFlat(req.params.id);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// Start the server only after the DB (table) is ready.
initDb()
  .catch((err) => console.error("DB init failed (continuing):", err.message))
  .finally(() => {
    app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
  });
