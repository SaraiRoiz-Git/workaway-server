//VALIDATION
const Joi = require('@hapi/joi')


const regValidation = (data)=>{
    const schema = {
        name: Joi.string()
            .min(1)
            .required(),
        email: Joi.string()
            .min(1)
            .required()
            .email(),
        password: Joi.string()
            .min(1)
            .required()
    };
    return Joi.validate(data,schema)
}

const loginValidation = (data)=>{
    const schema = {
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .required()
    };
    return Joi.validate(data,schema)
}
module.exports.regValidation = regValidation;
module.exports.loginValidation = loginValidation;