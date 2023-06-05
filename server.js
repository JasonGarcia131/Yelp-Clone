require("dotenv").config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const morgan = require("morgan");
const db = require('./db/index');

app.use(express.json());

// Get all restaurants
app.get('/api/v1/restaurants', async (req, res) => {

    try {
        const results = await db.query("SELECT * FROM restaurants");
        console.log(results);
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: {
                restaurants: results.rows
            }
        });
    } catch (e) {
        console.log(e);
    }

});

// Get one restaurant by id
app.get('/api/v1/restaurants/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const results = await db.query("SELECT * FROM restaurants WHERE id = $1", [id]);
        res.status(200).json({
            status: "success",
            data: {
                restaurants: results.rows[0]
            }
        });
    } catch (e) {

    }

});

// Create restaurant
app.post('/api/v1/restaurants/', (req, res) => {
    console.log(req.body);
    res.status(201).json("restaurant created");
});

// Update restaurant
app.put('/api/v1/restaurants/:id', (req, res) => {
    console.log(req.body);
    res.status(200).json("restaurant updated");
});

// Delete restaurant
app.delete('/api/v1/restaurants/:id', (req, res) => {
    console.log(req.params)
    res.status(200).json("restaurant deleted");
});

app.listen(PORT, () => {
    console.log("Server is listening on port ", PORT)
});