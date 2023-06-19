const db = require('mongoose');

const transactionSchema = new db.Schema({
    customerID: {
        type: String,
        required: true
    },
    products: {
        type: [{
            productID: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: [1, "Order quantity can not be less than 1"]
            }
        }],
        validate: {
            validator: (value) => {
                return value.length >= 1;
            },
            message: "There must be atleast 1 product"
        }
    },
    total_price: {
        type: Number,
        required: true,
    },
    transaction_date: {
        type: Date,
        validate: {
            validator: (value) => {
                const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
                return dateRegex.test(value.toISOString().slice(0, 10));
            },
            message: "Invalid date format. Expected format: YYYY-MM-DD"
        }
    }
});

module.exports = db.model('Transaction', transactionSchema);
