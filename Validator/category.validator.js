const Joi = require("joi");
const { join } = require("path");

const categoryValidation = (data) => {
  try {
    const categoryValidationSchema = Joi.object({
      adminId: Joi.string().min(2).max(30).messages({
        "string.empty": "Moshina markasi stringda kiritilishi shart!",
        "string.min": "Moshina markasi 2 ta belgidan ko'p bo'lishi kerak!",
        "string.max": "Moshina markasi 30 ta belgidan ko'p bo'lmasligi kerak!",
      }),
      markasi: Joi.string().min(2).max(30).required().messages({
        "string.base": "Mashina markasi string ko'rinishida bo'lishi shart!",
        "string.empty": "Mashina markasi bo'sh bo'lmasligi kerak!",
        "any.required": "Mashina markasi kiritilishi shart!",
        "string.min":
          "Mashina markasi kamida 2 ta belgidan iborat bo'lishi zarur!",
        "string.max": "Mashina markasi 30 ta belgidan ko'p bo'lmasligi zarur!",
      }),
      categoryImg: Joi.array().items(Joi.string()).messages({
        "array.base": "Iltimos rasm fayllarini yuklang!",
        "any.required": "CategoryImg qismi to'ldirilishi shart!",
      }),
    });
    return categoryValidationSchema.validate(data);
  } catch (error) {
    return new Error("Validation error", error);
  }
};
module.exports = categoryValidation;
