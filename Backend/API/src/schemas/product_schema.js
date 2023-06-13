const db = require('mongoose');

const productSchema = new db.Schema({
    imagePath: {
        type: String,
        require: true
    },

    productName: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    qty: {
        type: Number,
        require: true,
        min: [1, "Stock can not be less than 1."]
    },
    tags: {
        type: [String],
        enum: { values: ["best-seller", "sale", "featured", "carousel"], message: '{VALUE} is not supported' }
    }
});

module.exports = db.model('Product', productSchema);