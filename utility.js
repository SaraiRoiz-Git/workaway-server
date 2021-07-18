const { validate } = require('./model/User');
const User = require('./model/User');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const checkIfMailExist = (req) => {
    return User.findOne({ email: req.body.email });
}

const checkIfIDExist = (req, id) => {
    return User.findOneAndUpdate({ _id: id },
        {
            userName: req.body.userName,
            name: req.body.name,
            lastName: req.body.lastName,
            email: req.body.email, city: req.body.city,
            country: req.body.country,
            postal: req.body.postal,
            about: req.body.about
        }, { new: true }, (err, doc) => {
            if (err) {
                console.log("Something wrong when updating data!");
            }
            console.log(doc);
            return doc
        });
}

const validatePassword = (req, user) => {
    return bcrypt.compare(req.body.password, user.password)
}

const createNewUser = (req, hashPassword) => {
    return new User({

        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashPassword,
        userName: "",
        city: "",
        country: "",
        postal: "",
        about: ""

    });
}

const getUserIdFromToken = (token) => {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    return decoded._id
}

module.exports = {
    checkIfMailExist,
    validatePassword,
    createNewUser,
    checkIfIDExist,
    getUserIdFromToken
}