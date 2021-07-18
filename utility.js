const { validate } = require('./model/User');
const User = require('./model/User');
const bcrypt = require('bcryptjs')

const checkIfMailExist = (req) => {
    return User.findOne({ email: req.body.email });
}

const checkIfIDExist = (id) => {
    return User.updateOne({ _id: id },
        {
            userName: req.body.userName,
            name: req.body.name,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashPassword,
            city: req.body.city,
            country: req.body.country,
            postal: req.body.postal,
            about: req.body.about
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
        city: "",
        country: "",
        postal: "",
        about: ""

    });
}

const getUserIdFromToken = (token)=>{
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);  
    return decoded.id  
}

module.exports = {
    checkIfMailExist,
    validatePassword,
    createNewUser,
    getUserIdFromToken
}