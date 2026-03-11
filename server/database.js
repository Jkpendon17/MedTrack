const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./medtracker.db", (err) => {
    if (err) {
        console.error("Database connection error:", err.message);
    } else {
        console.log("Connected to SQLite database");
    }
});


// Create users table
db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name TEXT,
        last_name TEXT,
        date_of_birth TEXT,
        address TEXT,
        email TEXT UNIQUE,
        contact_number TEXT,
        pass TEXT
    )
`);

// Create medicines table
db.run(`
    CREATE TABLE IF NOT EXISTS medicines (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        medicine_name TEXT,
        quantity_taken INTEGER,
        dosage_per_tablet REAL,
        total_dosage REAL,
        medicine_date TEXT,
        medicine_time TEXT,
        status TEXT,
        FOREIGN KEY (user_id) REFERENCES users(id)
    )
`);

module.exports = db;