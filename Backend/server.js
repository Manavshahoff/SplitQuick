const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// PostgreSQL database credentials
const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
    // ssl: {
    //     rejectUnauthorized: false // Change to true if using self-signed certificates
    // }
});

// Establish a new connection to the PostgreSQL database
pool.connect()
    .then(() => console.log('Connected to PostgreSQL Database'))
    .catch(e => console.error('Failed to connect to PostgreSQL Database', e));

// Signup endpoint
app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Name, email, and password are required.' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

        // Insert the new user into the database
        const result = await pool.query(
            'INSERT INTO Users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
            [name, email, hashedPassword]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        if (err.code === '23505') { // Unique violation error code
            res.status(409).json({ message: 'Email already exists.' });
        } else {
            res.status(500).json({ message: 'Failed to create user.' });
        }
    }
});

//Login endpoint
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {
        // Check if the user exists
        const { rows } = await pool.query('SELECT * FROM Users WHERE email = $1', [email]);

        if (rows.length > 0) {
            const user = rows[0];

            // Compare the provided password with the stored hash
            if (await bcrypt.compare(password, user.password)) {
                // Passwords match
                res.json({ message: 'Login successful', userId: user.id });
            } else {
                // Passwords do not match
                res.status(401).json({ message: 'Invalid credentials' });
            }
        } else {
            // User not found
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});



// Fetch all users
app.get('/users', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Users');
        res.json(result.rows);
    } catch (err) {
        console.error('Error executing query', err.stack);
        res.status(500).send('Error fetching users');
    }
});

// Root endpoint
app.get('/', (req, res) => {
    res.json("From Backend Side");
});

// Start server
const PORT = process.env.PG_PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
