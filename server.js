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
        const results = await db.query("SELECT $2 FROM restaurants WHERE id = $1", [id, "name"]);
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
app.post('/api/v1/restaurants/', async (req, res) => {
    console.log(req.body);

    const { name, location, price_range } = req.body;
    try {
        const results = await db.query("INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) returning *", [name, location, price_range]);
        console.log(results);
        res.status(201).json({
            status: "success",
            data: {
                restaurant: results.rows[0]
            }
        });

    } catch (e) {

    }
});

// Update restaurant
app.put('/api/v1/restaurants/:id', async (req, res) => {

    try {
        const { name, location, price_range } = req.body;
        const id = req.params.id;
        const results = await db.query("UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 returning *", [name, location, price_range, id]);
        res.status(200).json({
            status: "success",
            data: {
                restaurants: results.rows[0]
            }
        });
    } catch (e) {

    }


});

// Delete restaurant
app.delete('/api/v1/restaurants/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const results = await db.query("DELETE restaurants WHERE id = $1", [id]);
        res.status(204).json({
            status: "success"
        });
    } catch (e) {

    }
});

app.listen(PORT, () => {
    console.log("Server is listening on port ", PORT)
});