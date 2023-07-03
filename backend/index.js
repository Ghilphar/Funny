const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const userRoutes = require('./routes/userRoutes');

// Create connection to MySQL
let db = mysql.createConnection({
    host: 'mysql', // The hostname of the running MySQL service in Docker Compose
    user: 'root',
    password: 'password', // Your root password
    database: 'mydb' // Your database name
});

// Create and configure the express app
const app = express();

const sessionStore = new MySQLStore({
    host: 'mysql',
    user: 'root',
    password: 'password',
    database: 'mydb'
});

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store: sessionStore
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRoutes);

// Connect to MySQL
db.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database');
    let sql = 'CREATE TABLE IF NOT EXISTS messages(message VARCHAR(255))';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log('Messages table created or already exists');

        // Insert a message
        sql = `INSERT INTO messages (message) VALUES ('Hello World')`;
        db.query(sql, (err, result) => {
            if (err) throw err;
            console.log('Inserted message into messages table');
        });
    });
});

// Enable CORS to accept requests from the React app
app.use(cors({
    origin: 'http://localhost:3000'
}));

app.get('/api/message', (req, res) => {
    const sql = 'SELECT message FROM messages ORDER BY RAND() LIMIT 1';

    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send({ message: result[0].message });
    });
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
