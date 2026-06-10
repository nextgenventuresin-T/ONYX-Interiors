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
  await pool.query(`
    CREATE TABLE IF NOT EXISTS flats (
      id          SERIAL PRIMARY KEY,
      title       TEXT        NOT NULL,
      type        TEXT        NOT NULL DEFAULT '3 BHK',
      description TEXT        NOT NULL DEFAULT '',
      image       TEXT        NOT NULL DEFAULT '',
      location    TEXT        NOT NULL DEFAULT '',
      status      TEXT        NOT NULL DEFAULT 'Available',
      sort_order  INTEGER     NOT NULL DEFAULT 0,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `);
  console.log("✓ Postgres connected, 'contacts' + 'flats' tables ready.");
}

// ---- Flats (managed from the admin panel) ----
export async function getFlats() {
  if (!hasDb) return [];
  const { rows } = await pool.query(
    `SELECT id, title, type, description, image, location, status, sort_order, created_at
     FROM flats ORDER BY sort_order ASC, id ASC`
  );
  return rows;
}

export async function createFlat(f) {
  if (!hasDb) throw new Error("No database configured.");
  const { rows } = await pool.query(
    `INSERT INTO flats (title, type, description, image, location, status, sort_order)
     VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
    [f.title, f.type || "3 BHK", f.description || "", f.image || "", f.location || "", f.status || "Available", f.sort_order || 0]
  );
  return rows[0];
}

export async function updateFlat(id, f) {
  if (!hasDb) throw new Error("No database configured.");
  const { rows } = await pool.query(
    `UPDATE flats SET
       title=$1, type=$2, description=$3, image=$4, location=$5, status=$6, sort_order=$7
     WHERE id=$8 RETURNING *`,
    [f.title, f.type, f.description, f.image, f.location, f.status, f.sort_order || 0, id]
  );
  return rows[0] || null;
}

export async function deleteFlat(id) {
  if (!hasDb) throw new Error("No database configured.");
  await pool.query(`DELETE FROM flats WHERE id=$1`, [id]);
  return true;
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
