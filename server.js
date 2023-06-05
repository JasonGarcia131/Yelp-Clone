require("dotenv").config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.use((req, res, next)=>{
    console.log("middleware");
    next();
});

// Get all restaurants
app.get('/api/v1/restaurants', (req, res)=>{
    res.status(200).json({
        "status": "success",
        "data": {
            "restaurant": [
                "wendys",
                "mcds"
            ]
        }
    })
});

// Get one restaurant by id
app.get('/api/v1/restaurants/:id', (req,res)=>{
    console.log(req.params);
});

app.listen(PORT, ()=>{
    console.log("Server is listening on port ", PORT)
});