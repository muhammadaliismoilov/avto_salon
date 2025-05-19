const Joi = require("joi");
const currentYear = new Date().getFullYear();

const carsValidator = (data) => {
  try {
    const carsValidatorSchema = Joi.object({
      adminId: Joi.string().min(2).max(30).messages({
        "string.empty": "Moshina markasi stringda kiritilishi shart!",
        "string.min": "Moshina markasi 2 ta belgidan ko'p bo'lishi kerak!",
        "string.max": "Moshina markasi 30 ta belgidan ko'p bo'lmasligi kerak!",
      }),
      markasi: Joi.string().required().min(2).max(30).messages({
        "string.empty": "Moshina markasi stringda kiritilishi shart!",
        "string.min": "Moshina markasi 2 ta belgidan ko'p bo'lishi kerak!",
        "string.max": "Moshina markasi 30 ta belgidan ko'p bo'lmasligi kerak!",
        "any.required": "Moshina markasi qismi to'ldirilishi shart!",
      }),
      model: Joi.string().required().min(2).max(70).messages({
        "string.empty": "Moshina modeli stringda kiritilishi shart!",
        "string.min": "Moshina modeli 2 ta belgidan ko'p bo'lishi kerak!",
        "string.max": "Moshina modeli 70 ta belgidan ko'p bo'lmasligi kerak!",
        "any.required": "Moshina modeli qismi to'ldirilishi shart!",
      }),
      year: Joi
      .number()
      .required()
      .min(1990)
      .max(currentYear)
      .messages({
        "number.base": "Moshina yili raqamlarda kiritilishi shart!",
        "number.max": `Moshina yili ${currentYear} dan oshmasligi kerak!`,
        "number.min": "Moshina yili 1990 dan kam bo'lmasligi kerak!",
        "any.required": "Moshina yili qismi to'ldirilishi shart!",
      }),
      motor: Joi.number().required().min(0).max(10).messages({
        "number.base": "Moshina motori raqamlarda kiritilishi shart!",
        "number.min": "Moshina motori 0 dan kam bo'lmasligi kerak!",
        "number.max": "Moshina motori 10 dan oshmasligi kerak!",
        "any.required": "Moshina motori qismi to'ldirilishi shart!",
      }),
      distance: Joi.number().required().min(0).max(10000000).messages({
        "number.base":
        "Moshina bosib o'tgan masofasi raqamlarda kiritilishi shart!",
        "number.max":
        "Moshina 10000000 km dan ko'p yurgan bo'lishi mumkun emas!",
        "any.required": "distance qismi to'ldirilishi shart!",
        "number.min": "Moshina  0 km dan kam yurgan bo'lishi mumkun emas!",
      }),
      color: Joi.string().required().min(1).max(100).messages({
        "string.empty": "Moshina rangi stringda kiritilishi shart!",
        "string.min": "Moshina rangi 1 ta belgidan ko'p bo'lishi kerak!",
        "string.max": "Moshina rangi 100 ta belgidan ko'p bo'lmasligi kerak!",
        "any.required": "Moshina rangi qismi to'ldirilishi shart!",
      }),
      tanirovkasi: Joi.string().valid("bor", "yo'q").required().messages({
        "any.only": "Iltimos tanlovlardan birini tanlang!",
      }),
      gearBook: Joi.string().required().min(1).max(50).messages({
        "string.empty": "Ma`lumot stringda kiritilishi shart!",
        "string.min": "Malumot 1 ta belgidan ko'p bo'lishi kerak!",
        "string.max": "Malumot 50 ta belgidan ko'p bo'lmasligi kerak!",
        "any.required": "Bu qismi to'ldirilishi shart!",
      }),
      description: Joi.string().required().min(1).max(2000).messages({
        "string.empty": "Moshina haqidagi ma'lumot stringda kiritilishi shart!",
        "string.max":
        "Moshina haqidagi ma'lumot 2000 ta belgidan ko'p bo'lmasligi kerak!",
        "string.min":
          "Moshina haqidida ma'lumot 1 ta belgidan ko'p bo'lishi kerak!",
        "any.required": "Description qismi to'ldirilishi shart!",
      }),
      narxi: Joi.number().required().min(0).messages({
        "number.base": "Narxni raqamlarda kiriting!",
        "number.min": "Narxni 0 dan kam bo'lmasligi kerak!",
        "any.required": "Narxi qismi to'ldirilishi shart!",
      }),
      carFonImgages: Joi.array().items(Joi.string()).messages({
        "array.base": "Iltimos rasm fayllarini yuklang!",
        "any.required": "CarFonImgages qismi to'ldirilishi shart!",
      }),
      interiorImages: Joi.array().items(Joi.string()).messages({
        "array.base": "Iltimos rasm fayllarini yuklang!",
        "any.required": "InteriorImages qismi to'ldirilishi shart!",
      }),
      exteriorImages: Joi.array().items(Joi.string()).messages({
        "array.base": "Iltimos rasm fayllarini yuklang!",
        "any.required": "ExteriorImages qismi to'ldirilishi shart!",
      }),
    });
    return carsValidatorSchema.validate(data);
  } catch (error) {
    throw new Error("Validator error", error);
  }
};

module.exports = carsValidator;
