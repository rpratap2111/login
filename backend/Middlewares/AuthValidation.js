const Joi = require('joi');
const User = require('../Models/User');
const bcrypt = require('bcrypt');

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,16}$/;

const signupValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string()
            .pattern(passwordPattern)
            .required()
            .messages({
                "string.pattern.base": "Password must be 8-16 characters and include at least one uppercase letter, one lowercase letter, one number, and one special character."
            }),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

const loginValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string()
            .pattern(passwordPattern)
            .required()
            .messages({
                "string.pattern.base": "Invalid password format. Must include uppercase, lowercase, number, and special character."
            }),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

module.exports = { signupValidation, loginValidation };
