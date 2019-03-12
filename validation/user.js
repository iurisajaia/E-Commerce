const Joi = require("joi");

// User Validation
function validateUser(user) {
  const schema = {
    firstname: Joi.string()
      .min(3)
      .max(50)
      .required(),
    lastname: Joi.string()
      .min(5)
      .max(50)
      .required(),
    username: Joi.string()
      .min(5)
      .max(50)
      .required(),
    email: Joi.string()
      .min(5)
      .max(50)
      .email()
      .required(),
    password: Joi.string()
      .min(8)
      .max(255)
      .required(),
    day: Joi.string().required(),
    month: Joi.string().required(),
    year: Joi.string().required(),
    gender: Joi.string().required()
  };

  return Joi.validate(user, schema);
}

exports.validate = validateUser;
