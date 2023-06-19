const db = require('mongoose');

const customerSchema = new db.Schema({
    username: {
        type: [String],
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                // Regular expression pattern to validate email format
                const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                return emailRegex.test(value);
            },
            message: 'Please enter a valid email address'
        }
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        validate: {
            validator: (value) => {
                // Regular expression pattern to validate phone format
                const phoneRegex = /^(\+?63|0)9\d{9}$/;
                return phoneRegex.test(value);
            },
            message: 'Please enter a valid Philippine mobile number'
        }
    },
    payment_method: {
        type: [String],
        required: true,
        enum: ["GCash", "Debit Card", "Cash-On-Delivery"],
        validate: {
            validator: (value) => {
                return value.length >= 1;
            },
            message: "There must be atleast 1 payment method"
        }
    }
});

module.exports = db.model('Customer', customerSchema);