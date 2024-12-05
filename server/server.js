const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const port = 3000;

// Set up MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'inventory_system'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
    } else {
        console.log('Connected to database');
    }
});

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Routes for managing products
app.get('/products', (req, res) => {
    db.query('SELECT * FROM products', (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

app.post('/products', (req, res) => {
    const { name, description, price, quantity } = req.body;
    const query = 'INSERT INTO products (name, description, price, quantity) VALUES (?, ?, ?, ?)';
    db.query(query, [name, description, price, quantity], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ message: 'Product added' });
    });
});

app.put('/products/:id', (req, res) => {
    const { name, description, price, quantity } = req.body;
    const { id } = req.params;
    const query = 'UPDATE products SET name = ?, description = ?, price = ?, quantity = ? WHERE id = ?';
    db.query(query, [name, description, price, quantity, id], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Product updated' });
    });
});

app.delete('/products/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM products WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Product deleted' });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
