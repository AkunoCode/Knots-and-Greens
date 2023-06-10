// Importing Dependencies
const express = require('express');
const db = require('mongoose');
const router = express.Router();
const bodyParser = require('body-parser');
const Customer = require('../schemas/customer_schema');
require('dotenv').config();

// Middlewares
router.use(bodyParser.json());

// Connecting to the MongoDB Database
db.connect(process.env.MONGODBCONSTRING).then(() => {
    console.log("Customer routes' connection to MongoDB established successfully...");
}).catch((err) => {
    console.log("DATABASE CONNECTION ERROR!");
});

// GET METHOD: Retrieve all the products listed in the database.
router.get('/customers', (req, res) => {
    Customer.find().then((customer) => {
        res.status(200).json({
            message: "Customer data retrieved successfully.",
            result: customer
        });
    }).catch((err) => {
        res.status(500).json({ error: err.message });
    });
});

// GET METHOD (SINGLE): Retrieve single customer that matches the customerID attached in the http request URI parameter.
router.get('/customers/:customerID', (req, res) => {
    const customerID = req.params.customerID;
    Customer.findById(customerID).then((customer) => {
        if (!customer) {
            return res.status(404).json({ message: `Customer with customerID ${customerID} could not be found` });
        }
        res.status(200).json({
            message: `Customer datas retrieved successfully.`,
            result: customer
        });
    }).catch((err) => {
        res.status(500).json({ error: err.message });
    });
});


// POST METHOD: Input New Record from the data attached in the body of the http request, which will then
// be parsed by the middleware.
router.post('/customers', (req, res) => {
    const { name, email, password, address, phone, payment_method } = req.body;
    const newCustomer = new Customer({ name, email, password, address, phone, payment_method });


    newCustomer.save().then((customer) => {
        res.status(201).json({
            message: `Customer data created and saved.`,
            result: customer
        });
    }).catch((err) => {
        res.status(500).json({ error: err.message });
    });
});


// PUT METHOD: Update a record by fetching the customerID attached in the parameters of the URI and replacing
// it with the values that will come from the body of the http request.
router.put('/customers/:customerID', (req, res) => {
    const customerID = req.params.customerID;
    const { name, email, password, address, phone, payment_method } = req.body;

    Customer.findByIdAndUpdate(customerID, { name, email, password, address, phone, payment_method },
        { new: true, runValidators: true }).then((customer) => {
            if (!customer) {
                return res.status(404).json({ message: `Customer with customerID ${customerID} could not be found.` })
            }
            res.status(200).json({
                message: `Customer with customerID ${customerID} successfully updated.`,
                result: customer
            });
        }).catch((err) => {
            res.status(500).json({ error: err.message });
        });
});


// DELETE METHOD: Delete a record in the database by matching the customerID attached in the parameters of the http request URI
router.delete('/customers/:customerID', (req, res) => {
    const customerID = req.params.customerID;

    Customer.findByIdAndDelete(customerID).then((customer) => {
        if (!customer) {
            return res.status(404).json({ message: `Customer with customerID ${customerID} could not be found.` })
        }
        res.status(200).json({
            message: `Customer with customerID ${customerID} successfully deleted.`,
        });
    }).catch((err) => {
        res.status(500).json({ error: err.message });
    });
});

module.exports = router;