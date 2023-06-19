const db = require('mongoose');

const productSchema = new db.Schema({
    imagePath: {
        type: String,
        required: true
    },

    productName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    qty: {
        type: Number,
        required: true,
        min: [1, "Stock can not be less than 1."]
    },
    tags: {
        type: [String],
        enum: { values: ["hot", "sale", "featured", "carousel"], message: '{VALUE} is not supported' }
    }
});

module.exports = db.model('Product', productSchema);