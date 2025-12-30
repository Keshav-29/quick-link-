import { DB } from "./deps.ts";

export const db = new DB("urls.db");

db.execute(`
  CREATE TABLE IF NOT EXISTS urls (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT UNIQUE,
    longUrl TEXT
  )
`);
