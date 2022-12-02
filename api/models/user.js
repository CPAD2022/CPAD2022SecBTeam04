const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = mongoose.Schema({
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
    password: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('User',userSchema);