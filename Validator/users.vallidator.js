const Joi = require("joi");

const userValidator = (data) => {
  try {
    const userValidatorSchema = Joi.object({
      userName: Joi.string().min(3).max(50).required().messages({
        "string.base": "userName satr bo`lishi kerak",
        "string.empty": "userName bo`sh bo`lmasligi kerak",
        "string.min": "userName kamida 3 belgidan iborat bo`lishi kerak",
        "any.required": "userName majburiy maydon",
      }),

      email: Joi.string().email().required().messages({
        "string.email": "email to`g`ri formatda bo`lishi kerak",
        "string.empty": "email bo`sh bo`lmasligi kerak",
        "any.required": "email majburiy maydon",
      }),

      password: Joi.string().min(4).required().messages({
        "string.min": "Parol kamida 4 belgidan iborat bo`lishi kerak",
        "string.empty": "Parol bo`sh bo`lmasligi kerak",
        "any.required": "Parol majburiy maydon",
      }),
    });
    return userValidatorSchema.validate(data);
  } catch (error) {
    throw new Error("Validator error", error);
  }
};

module.exports = userValidator;
