import { Database, type Statement } from "bun:sqlite";

export interface Record {
  key: string;
  value: string;
  expires: number;
}

const db = new Database(":memory:", { strict: true });

// Create items table
db.run(`
  CREATE TABLE IF NOT EXISTS items (
      key TEXT NOT NULL PRIMARY KEY, 
      value TEXT, 
      expires INT
  ) STRICT
`);
db.run(`
  CREATE INDEX IF NOT EXISTS ix_items_expires ON items (expires)
`);
db.run(`
  CREATE INDEX IF NOT EXISTS ix_items_value ON items (value)
`);

// -------------------------------------------------
// Statements
// -------------------------------------------------
const STATEMENTS = {
  getByKey: db.query(`
    SELECT key, value, expires
    FROM items
    WHERE key = $key
  `) as Statement<Record>,
  getByValue: db.query(`
    SELECT key, value, expires
    FROM items
    WHERE value = $value
  `) as Statement<Record>,
  getAll: db.query(`
    SELECT key, value, expires
    FROM items
  `) as Statement,

  setItem: db.query(`
    INSERT INTO items (
        key, value, expires
    ) VALUES (
        $key, $value, $expires
    )
`) as Statement,

  delete: db.query(`
    DELETE FROM items
    WHERE key = $key
`) as Statement,

  deleteExpired: db.query(`
    DELETE FROM items
    WHERE expires < $now
`) as Statement,
};

// -------------------------------------------------
// Create items table
// -------------------------------------------------
export const kv_Actions = {
  set: ({ key, value }: { key: string; value: string }) => {
    // Calculate expiration time (now + 1 day in seconds)
    const nowInSeconds = Math.floor(Date.now() / 1000);
    const oneDayInSeconds = 24 * 60 * 60; // 86400
    const expiresAt = nowInSeconds + oneDayInSeconds;

    STATEMENTS.setItem.run({ key: key, value: value, expires: expiresAt });

    return key;
  },
  get: ({ by, val }: { by: "key" | "value"; val: string }): Record | null => {
    let record: Record | null;
    if (by === "key") {
      record = STATEMENTS.getByKey.get({ key: val });
    } else {
      record = STATEMENTS.getByValue.get({ value: val });
    }

    if (!record) return null;

    const { key, expires } = record;
    const nowInSeconds = Math.floor(Date.now() / 1000);

    if (expires) {
      if (expires < nowInSeconds) {
        STATEMENTS.delete.run({ key: key });
        return null;
      }
    }
    return record;
  },
  getAll: () => {
    const records = STATEMENTS.getAll.all();
    console.log(records);
  },
  delete: (key: string) => {
    STATEMENTS.delete.run({ key: key });
  },
  deleteExpired: () => {
    const nowInSeconds = Math.floor(Date.now() / 1000);

    STATEMENTS.deleteExpired.run({ now: nowInSeconds });
  },
};
