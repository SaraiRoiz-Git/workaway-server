const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    userName: {
        type: String
    },
    name: {
        type: String,
    },
    lastName: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },

    email: {
        type: String,
    },
    city: {
        type: String,
    },
    country: {
        type: String,
    },
    postal: {
        type: String,
    },
    about: {
        type: String,
    }

});

module.exports = mongoose.model('User', userSchema)