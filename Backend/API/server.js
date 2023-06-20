// IMPORTING DEPENDENCIES
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT;

// Routes
const productRoutes = require('./src/routes/product_routes');
const customerRoutes = require('./src/routes/customer_routes');
const transactionRoutes = require('./src/routes/transaction_routes');
const cartRoutes = require('./src/routes/cart_routes');


const app = express();


// MIDDLEWARE
app.use(cors());
app.use(productRoutes);
app.use(customerRoutes);
app.use(transactionRoutes);
app.use(cartRoutes)

// Running server on port
app.listen(port, () => {
    console.log(`Running on port:${port}.`);
});