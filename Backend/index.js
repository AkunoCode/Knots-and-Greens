// IMPORTING DEPENDENCIES
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT;

// Routes
const productRoutes = require('./src/routes/product_routes');
const customerRoutes = require('./src/routes/customer_routes')


const app = express();

// MIDDLEWARE
app.use(cors());
app.use(productRoutes)
app.use(customerRoutes)

// Running server on port
app.listen(port, () => {
    console.log(`Running on port:${port}.`);
});