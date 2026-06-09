import express from "express";
import cors from "cors";
import { projects, services } from "./data/projects.js";
import { initDb, saveContact, getContacts, hasDb } from "./db.js";

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
    const saved = await saveContact({
      name: String(name).trim(),
      email: String(email).trim(),
      message: String(message).trim(),
    });
    console.log("New enquiry saved:", saved.id ?? "(no-db)");
    res.json({ ok: true, message: "Thank you — we'll be in touch shortly." });
  } catch (err) {
    console.error("Failed to save enquiry:", err.message);
    res.status(500).json({ ok: false, error: "Something went wrong. Please try again." });
  }
});

// Admin: view stored enquiries. Protected by ADMIN_TOKEN env var.
//   GET /api/contacts?token=YOUR_ADMIN_TOKEN
app.get("/api/contacts", async (req, res) => {
  const token = req.query.token || req.get("x-admin-token");
  if (!process.env.ADMIN_TOKEN || token !== process.env.ADMIN_TOKEN) {
    return res.status(401).json({ ok: false, error: "Unauthorized" });
  }
  try {
    const rows = await getContacts(200);
    res.json({ ok: true, count: rows.length, contacts: rows });
  } catch (err) {
    console.error("Failed to read enquiries:", err.message);
    res.status(500).json({ ok: false, error: "Could not read enquiries." });
  }
});

// Start the server only after the DB (table) is ready.
initDb()
  .catch((err) => console.error("DB init failed (continuing):", err.message))
  .finally(() => {
    app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
  });
