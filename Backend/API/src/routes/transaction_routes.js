// Importing Dependencies
const express = require('express');
const db = require('mongoose');
const router = express.Router();
const bodyParser = require('body-parser');
const Transaction = require('../schemas/transaction_schema');
require('dotenv').config();

// Middlewares
router.use(bodyParser.json());

// Connecting to the MongoDB Database
db.connect(process.env.MONGODBCONSTRING).then(() => {
    console.log("Transaction routes' connection to MongoDB established successfully...");
}).catch((err) => {
    console.log("DATABASE CONNECTION ERROR!");
});

// GET METHOD: Retrieve all the products listed in the database.
router.get('/transactions', (req, res) => {
    Transaction.find().then((transaction) => {
        res.status(200).json({
            message: "Transaction data retrieved successfully.",
            result: transaction
        });
    }).catch((err) => {
        res.status(500).json({ error: err.message });
    });
});

// GET METHOD (SINGLE): Retrieve single transaction that matches the transactionID attached in the http request URI parameter.
router.get('/transactions/:transactionID', (req, res) => {
    const transactionID = req.params.transactionID;
    Transaction.findById(transactionID).then((transaction) => {
        if (!transaction) {
            return res.status(404).json({ message: `Transaction with transactionID ${transactionID} could not be found` });
        }
        res.status(200).json({
            message: `Transaction datas retrieved successfully.`,
            result: transaction
        });
    }).catch((err) => {
        res.status(500).json({ error: err.message });
    });
});


// POST METHOD: Input New Record from the data attached in the body of the http request, which will then
// be parsed by the middleware.
router.post('/transactions', (req, res) => {
    const { customerID, products, total_price, transaction_date } = req.body;
    const newCustomer = new Transaction({ customerID, products, total_price, transaction_date });


    newCustomer.save().then((transaction) => {
        res.status(201).json({
            message: `Transaction data created and saved.`,
            result: transaction
        });
    }).catch((err) => {
        res.status(500).json({ error: err.message });
    });
});


// PUT METHOD: Update a record by fetching the transactionID attached in the parameters of the URI and replacing
// it with the values that will come from the body of the http request.
router.put('/transactions/:transactionID', (req, res) => {
    const transactionID = req.params.transactionID;
    const { customerID, products, total_price, transaction_date } = req.body;

    Transaction.findByIdAndUpdate(transactionID, { customerID, products, total_price, transaction_date },
        { new: true, runValidators: true }).then((transaction) => {
            if (!transaction) {
                return res.status(404).json({ message: `Transaction with transactionID ${transactionID} could not be found.` })
            }
            res.status(200).json({
                message: `Transaction with transactionID ${transactionID} successfully updated.`,
                result: transaction
            });
        }).catch((err) => {
            res.status(500).json({ error: err.message });
        });
});


// DELETE METHOD: Delete a record in the database by matching the transactionID attached in the parameters of the http request URI
router.delete('/transactions/:transactionID', (req, res) => {
    const transactionID = req.params.transactionID;

    Transaction.findByIdAndDelete(transactionID).then((transaction) => {
        if (!transaction) {
            return res.status(404).json({ message: `Transaction with transactionID ${transactionID} could not be found.` })
        }
        res.status(200).json({
            message: `Transaction with transactionID ${transactionID} successfully deleted.`,
        });
    }).catch((err) => {
        res.status(500).json({ error: err.message });
    });
});

module.exports = router;