import express from "express";
import cors from "cors";
import { projects, services } from "./data/projects.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.get("/api/projects", (_req, res) => res.json(projects));
app.get("/api/services", (_req, res) => res.json(services));

// Contact / enquiry endpoint — logs to console; wire to email/DB later.
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: "Missing fields." });
  }
  console.log("📩 New enquiry:", { name, email, message });
  res.json({ ok: true, message: "Thank you — we'll be in touch shortly." });
});

app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
