const Joi = require('joi');
const User = require('../Models/User');
const bcrypt = require('bcrypt');


const signupValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(16).required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
}

const loginValidation = (res, req, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(16).required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
}

module.exports = { signupValidation, loginValidation };
