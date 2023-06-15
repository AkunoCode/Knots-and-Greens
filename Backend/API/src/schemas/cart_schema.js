const db = require('mongoose');

const cartSchema = new db.Schema({
    customerID: {
        require: true,
        type: String
    },
    products: {
        type: [{
            productID: {
                type: String,
                require: true
            },
            quantity: {
                type: Number,
                require: true,
            }
        }]
    }
});

module.exports = db.model('Cart', cartSchema);