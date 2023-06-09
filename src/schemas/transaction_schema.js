const db = require('mongoose');

const transactionSchema = new db.Schema({
    customerID: {
        type: String,
        require: true
    },
    products: [{
        productID:{
        type: String,
        require: true
        },
        quantity:{
        type: Number,
        require: true,
        min:[1,"Order quantity can not be less than 1"]
        }
    }],
    total_price: {
        type: Number,
        require: true,
    },
    transaction_date: {
        type: Date,
    }
});

module.exports = db.model('Transaction', transactionSchema);
