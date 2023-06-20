// Importing Dependencies
const bcrypt = require('bcrypt');
const express = require('express');
const db = require('mongoose');
const router = express.Router();
const bodyParser = require('body-parser');
const Customer = require('../schemas/customer_schema');
const jwt = require('jsonwebtoken');
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
    const { username, email, password, address, phone, payment_method } = req.body;

    // Hashing the password before saving it to the database.
    bcrypt.hash(password, 10).then((hash) => {
        const newCustomer = new Customer({ username, email, password: hash, address, phone, payment_method });
        newCustomer.save().then((customer) => {
            res.status(201).json({
                message: `Customer data created and saved.`,
                result: customer
            });
        }).catch((err) => {
            res.status(500).json({ error: err.message });
        });
    }).catch((err) => {
        res.status(500).json({ error: err.message });
    });
});


// POST METHOD: Login a customer by matching the email and password attached in the body of the http request.
router.post('/customers/login', async (req, res) => {
    const { email, password } = req.body;

    // Check if the username is in the database
    const userMatch = await Customer.findOne({ email });
    if (!userMatch) {
        return res.status(401).json({ message: "Invalid username or password." });
    } else {
        // Check if the password is correct
        const passwordMatch = await bcrypt.compare(password, userMatch.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid username or password." });
        } else {
            // Create a token
            const token = jwt.sign({
                id: userMatch._id,
                username: userMatch.username,
                email: userMatch.email,
                address: userMatch.address,
                phone: userMatch.phone,
                payment_method: userMatch.payment_method
            }, process.env.JWT_SECRET, { expiresIn: '10m' });
            // Send the token
            return res.status(200).json({ token: token, message: "Successfully logged in." });
        }
    }
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