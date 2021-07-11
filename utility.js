const { validate } = require('./model/User');
const User = require('./model/User');
const bcrypt = require('bcryptjs')

const checkIfMailExist = (req) => {
    return User.findOne({ email: req.body.email });
}

const validatePassword = (req, user) => {
    return bcrypt.compare(req.body.password, user.password)
}

const createNewUser = (req, hashPassword) => {
    return new User({
        name: req.body.name,
        lastName: req.body.name,
        email: req.body.email,
        password: hashPassword
    });
}


module.exports = {
    checkIfMailExist,
    validatePassword,
    createNewUser
}