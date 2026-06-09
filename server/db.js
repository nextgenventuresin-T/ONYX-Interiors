import pg from "pg";

const { Pool } = pg;

// Neon (and most managed Postgres) require SSL. Local Postgres usually doesn't.
const connectionString = process.env.DATABASE_URL;
const isLocal =
  !connectionString ||
  /localhost|127\.0\.0\.1/.test(connectionString);

export const hasDb = Boolean(connectionString);

export const pool = hasDb
  ? new Pool({
      connectionString,
      ssl: isLocal ? false : { rejectUnauthorized: false },
    })
  : null;

// Create the table if it doesn't exist. Safe to run on every boot.
export async function initDb() {
  if (!hasDb) {
    console.warn(
      "⚠  DATABASE_URL not set — running WITHOUT a database (enquiries will only be logged, not saved)."
    );
    return;
  }
  await pool.query(`
    CREATE TABLE IF NOT EXISTS contacts (
      id         SERIAL PRIMARY KEY,
      name       TEXT        NOT NULL,
      email      TEXT        NOT NULL,
      message    TEXT        NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `);
  console.log("✓ Postgres connected, 'contacts' table ready.");
}

// Persist one enquiry. Falls back to a logged record if there's no DB.
export async function saveContact({ name, email, message }) {
  if (!hasDb) {
    const fake = { id: null, created_at: new Date().toISOString(), name, email, message };
    console.log("📩 New enquiry (not persisted — no DB):", fake);
    return fake;
  }
  const { rows } = await pool.query(
    `INSERT INTO contacts (name, email, message)
     VALUES ($1, $2, $3)
     RETURNING id, created_at`,
    [name, email, message]
  );
  return rows[0];
}

// Most-recent enquiries (used by the admin endpoint).
export async function getContacts(limit = 100) {
  if (!hasDb) return [];
  const { rows } = await pool.query(
    `SELECT id, name, email, message, created_at
     FROM contacts ORDER BY created_at DESC LIMIT $1`,
    [limit]
  );
  return rows;
}
