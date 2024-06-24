const Joi = require('joi');

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  age: Joi.number().integer().min(18).max(120),
  city: Joi.string(),
  zipCode: Joi.string().pattern(/^\d{5}(-\d{4})?$/).message('Invalid ZIP code').required(),
   password: Joi.string().min(3)
});

const partialUserSchema = Joi.object({
  email: Joi.string().email(),
  name: Joi.string(),
  age: Joi.number().integer().min(18).max(120),
  city: Joi.string(),
  zipCode: Joi.string().pattern(/^\d{5}(-\d{4})?$/).message('Invalid ZIP code'),
}).min(1);

module.exports = {
  validateUser: (user) => userSchema.validate(user),
  validatePartialUser: (user) => partialUserSchema.validate(user),
};