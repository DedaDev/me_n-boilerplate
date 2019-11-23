const Joi = require('@hapi/joi');

const createSchema = (obj) => Joi.object(obj);

exports.loginSchema = createSchema({
  email: Joi.string().email(),
  password: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
});
