import Database from 'better-sqlite3';

const db = new Database('reloop.db');

// Initialize the database with necessary tables
db.exec(`
  CREATE TABLE IF NOT EXISTS pickups (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    address TEXT,
    wasteDescription TEXT,
    status TEXT DEFAULT 'Scheduled',
    pickupDate TEXT,
    estimatedCompletion TEXT,
    recycledProduct TEXT
  )
`);

export function schedulePickupDB(pickup: {
  name: string;
  email: string;
  address: string;
  wasteDescription: string;
}) {
  const stmt = db.prepare(`
    INSERT INTO pickups (name, email, address, wasteDescription, pickupDate, estimatedCompletion)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  
  const pickupDate = new Date().toISOString();
  const estimatedCompletion = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
  
  const info = stmt.run(
    pickup.name,
    pickup.email,
    pickup.address,
    pickup.wasteDescription,
    pickupDate,
    estimatedCompletion
  );
  
  return info.lastInsertRowid;
}

export function getRecyclingStatusDB(email: string) {
  const stmt = db.prepare(`
    SELECT status, pickupDate, estimatedCompletion, recycledProduct
    FROM pickups
    WHERE email = ?
    ORDER BY id DESC
    LIMIT 1
  `);
  
  return stmt.get(email);
}

export function updateRecyclingStatusDB(email: string, status: string, recycledProduct?: string) {
  const stmt = db.prepare(`
    UPDATE pickups
    SET status = ?, recycledProduct = COALESCE(?, recycledProduct)
    WHERE email = ? AND id = (
      SELECT id FROM pickups WHERE email = ? ORDER BY id DESC LIMIT 1
    )
  `);
  
  stmt.run(status, recycledProduct, email, email);
}

