// IMPORTING DEPENDENCIES
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const productRoutes = require('./src/routes/product_routes');
const port = process.env.PORT;


const app = express();

// MIDDLEWARE
app.use(cors());
app.use(productRoutes)

// Running server on port
app.listen(port, () => {
    console.log(`Running on port:${port}.`);
});