// Importing Dependencies
const express = require('express');
const Cart = require('../schemas/cart_schema');
const router = express.Router();
const db = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();


// Middlewares
router.use(bodyParser.json());


// Connecting to the NoSQL Database (MongoDB) using mongoose connect() method.
db.connect(process.env.MONGODBCONSTRING).then(() => {
    console.log(`Cart routes' connection to MongoDB established successfully...`);
}).catch((err) => {
    console.log('DATABASE CONNECTION ERROR!');
});


// GET METHOD: Retrieve all the carts listed in the database.
router.get('/carts', (req, res) => {
    Cart.find().then((cart) => {
        res.status(200).json({
            message: "Successfully retrieved cart records.",
            result: cart
        });
    }).catch((err) => {
        res.status(500).json({ error: err.message });
    });
});


// GET METHOD (SINGLE): Retrieve single cart that matches the cartID attached in the http request URI parameter.
router.get('/carts/:id', (req, res) => {
    const cartID = req.params.id;

    Cart.findById(cartID).then((cart) => {
        if (!cart) {
            return res.status(404).json({ message: `Cart ID ${cartID} Not Found` });
        }
        res.status(200).json({ message: "Single cart retrieved successfully.", result: cart });
    }).catch((err) => {
        res.status(500).json({ error: err.message });
    });
});


// POST METHOD: Input New Record from the data attached in the body of the http request, which will then 
// be parsed by the middleware.
router.post('/carts', (req, res) => {
    const { customerID, products } = req.body;
    const newProduct = new Cart({ customerID, products });

    newProduct.save().then((cart) => {
        res.status(201).json({ message: "Cart successfully created.", result: cart });
    }).catch((err) => {
        res.status(500).json({ error: err.message });
    });
});


// PUT METHOD: Update a record by fetching the cartID attached in the parameters of the URI and replacing
// it with the values that will come from the body of the http request.
router.put('/carts/:id', (req, res) => {
    const cartID = req.params.id;
    const { customerID, products } = req.body;

    Cart.findByIdAndUpdate(cartID, { customerID, products }, { new: true, runValidators: true }).then((cart) => {
        if (!cart) {
            return res.status(404).json({ message: `Cart ID ${cartID} could not be found.` });
        }
        res.status(200).json({ message: "Cart information successfully updated", result: cart });
    }).catch((err) => {
        res.status(500).json({ error: err.message });
    });
});


// DELETE METHOD: Delete a record in the database by matching the cartID attached in the parameters of the http request URI
router.delete('/carts/:id', (req, res) => {
    const cartID = req.params.id;
    Cart.findByIdAndDelete(cartID).then((cart) => {
        if (!cart) {
            return res.status(404).json({ message: `Cart ID ${cartID} could not be found.` });
        }
        res.status(200).json({ message: "Cart successfully deleted." });
    }).catch((err) => {
        res.status(500).json({ error: err.message });
    });
});

module.exports = router;