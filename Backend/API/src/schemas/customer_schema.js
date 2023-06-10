const db = require('mongoose');

const customerSchema = new db.Schema({
    name: {
        firstname: {
            type: String,
            require: true
        },
        lastname: {
            type: String,
            require: true
        }
    },
    email: {
        type: String,
        require: true,
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
        require: true
    },
    address: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true,
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
        require: true,
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