const db = require('mongoose');

const cartSchema = new db.Schema({
    customerID: {
        required: true,
        type: String
    },
    products: {
        type: [{
            productID: {
                type: String,
                required: true
            },
            productName: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true,
            },
            price: {
                type: Number,
                required: true
            }
        }]
    }
});

module.exports = db.model('Cart', cartSchema);