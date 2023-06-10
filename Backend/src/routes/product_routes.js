// Importing Dependencies
const express = require('express');
const Product = require('../schemas/product_schema');
const router = express.Router();
const db = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();


// Middlewares
router.use(bodyParser.json());


// Connecting to the NoSQL Database (MongoDB) using mongoose connect() method.
db.connect(process.env.mongodbconstring).then(() => {
    console.log('Connection to Database Successful');
}).catch((err) => {
    console.log('Database Connection Error');
});


// GET METHOD: Retrieve all the products listed in the database.
router.get('/product', (req, res) => {
    Product.find().then((product) => {
        res.status(200).json({ message: "Successfully retrieved product records.", result: product });
    }).catch((err) => {
        res.status(500).json({ error: err.message });
    });
});


// GET METHOD (SINGLE): Retrieve single product that matches the productID attached in the http request URI parameter.
router.get('/product/:id', (req, res) => {
    const productID = req.params.id;

    Product.findById(productID).then((product) => {
        if (!product) {
            return res.status(404).json({ message: `Product ID ${productID} Not Found` });
        }
        res.status(200).json({ message: "Single product retrieved successfully.", result: product });
    }).catch((err) => {
        res.status(500).json({ error: err.message });
    });
});


// POST METHOD: Input New Record from the data attached in the body of the http request, which will then 
// be parsed by the middleware.
router.post('/product', (req, res) => {
    const { productName, price, qty, tags } = req.body;
    const newProduct = new Product({ productName, price, qty, tags });

    newProduct.save().then((product) => {
        res.status(201).json({ message: "Product successfully created.", result: product });
    }).catch((err) => {
        res.status(500).json({ error: err.message });
    });
});


// PUT METHOD: Update a record by fetching the productID attached in the parameters of the URI and replacing
// it with the values that will come from the body of the http request.
router.put('/product/:id', (req, res) => {
    const productID = req.params.id;
    const { productName, price, qty, tags } = req.body;

    Product.findByIdAndUpdate(productID, { productName, price, qty, tags }, { new: true, runValidators: true }).then((product) => {
        if (!product) {
            return res.status(404).json({ message: `Product ID ${productID} could not be found.` });
        }
        res.status(200).json({ message: "Product information successfully updated", result: product });
    }).catch((err) => {
        res.status(500).json({ error: err.message });
    });
});


// DELETE METHOD: Delete a record in the database by matching the productID attached in the parameters of the http request URI
router.delete('/product/:id', (req, res) => {
    const productID = req.params.id;
    Product.findByIdAndDelete(productID).then((product) => {
        if (!product) {
            return res.status(404).json({ message: `Product ID ${productID} could not be found.` });
        }
        res.status(200).json({ message: "Product successfully deleted." });
    }).catch((err) => {
        res.status(500).json({ error: err.message });
    });
});

module.exports = router;