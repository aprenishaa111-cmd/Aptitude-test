const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const cron = require('node-cron');

const app = express();
app.use(cors());
app.use(express.json());

// --- 1. DATABASE MEMORY SETUP (SQLite) ---
const db = new sqlite3.Database('./students.sqlite'); 

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT, last_login DATE)");
    db.run("CREATE TABLE IF NOT EXISTS progress (user_id INTEGER, topic TEXT, score INTEGER)");
    db.run("INSERT OR IGNORE INTO users (id, name, last_login) VALUES (1, 'Student1', date('now', '-4 days'))");
});

const SYLLABUS = ["Addition", "Percentages", "Ratios", "Profit & Loss"];

// --- 2. PROGRESS TRACKING API ---
app.post('/api/progress', (req, res) => {
    const { userId, topic, score } = req.body;
    db.run("INSERT INTO progress (user_id, topic, score) VALUES (?, ?, ?)", [userId, topic, score], (err) => {
        if(err) return res.status(500).send(err.message);
        db.run("UPDATE users SET last_login = date('now') WHERE id = ?", [userId]);
        res.send({ message: "Progress saved! Teacher is proud." });
    });
});

// --- 3. RECOMMENDATION ENGINE API (What's next?) ---
app.get('/api/next-topic/:userId', (req, res) => {
    const userId = req.params.userId;
    db.all("SELECT topic FROM progress WHERE user_id = ?", [userId], (err, rows) => {
        const completedTopics = rows.map(row => row.topic);
        const nextTopic = SYLLABUS.find(topic => !completedTopics.includes(topic)) || "Course Completed!";
        res.send({ nextTopic: nextTopic });
    });
});

// --- 4. AUTOMATED REMINDERS ---
cron.schedule('0 0 * * *', () => { 
    db.all("SELECT * FROM users WHERE last_login <= date('now', '-3 days')", (err, users) => {
        users.forEach(user => {
            console.log(`[TEACHER REMINDER] Triggering email to ${user.name}: "Hey! It's been 3 days. Let's study!"`);
        });
    });
});

// Start the server
app.listen(5000, () => console.log('Virtual Teacher Backend running on port 5000'));