const mongoose = require('mongoose');
const validator = require('validator');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: true,
        validator(value) {
            if (!validator.isEmail(value)) {
                return new Error('Invalid email address');
            }
        }
    },
    name: {
        type: String,
        required: true,
    },
    expiry: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Product',productSchema);