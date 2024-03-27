const express = require('express');
const cors = require('cors');
const sql = require('mssql');
const bcrypt = require('bcrypt');
require('dotenv').config();


const app = express();
app.use(express.json());

app.use(cors());

// Update with your Azure SQL Database credentials
const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    server: process.env.DB_SERVER,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: true, // Use this if you're on Windows Azure
        trustServerCertificate: false // Change to true if you have issues with certificate validation
    }
};

sql.connect(dbConfig).then(pool => {
    console.log('Connected to Azure SQL Database')});

    // Signup endpoint
    app.post('/signup', async (req, res) => {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).send('Name, email, and password are required.');
        }

        try {
            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insert the new user into the database
            const result = await pool.request()
                .input('Name', sql.NVarChar, name)
                .input('Email', sql.NVarChar, email)
                .input('Password', sql.NVarChar, hashedPassword)
                .query('INSERT INTO Users (Name, Email, Password) VALUES (@Name, @Email, @Password)');

            res.status(201).send('User created successfully.');
        } catch (err) {
            if (err.number === 2627) {
                // Handle duplicate key error (email must be unique)
                return res.status(400).send('A user with this email already exists.');
            }
            console.error('Database error:', err);
            res.status(500).send('Failed to create user.');
        }
    });

app.get('/users', async (req, res) => {
    try {
        // Make sure to await the connection
        await sql.connect(dbConfig);
        const result = await sql.query`SELECT * FROM users`;
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send({ message: "Error connecting to the database", error: err });
    }
});

app.get('/', (req, res) => {
    return res.json("From Backend Side");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
