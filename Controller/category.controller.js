const BaseError = require("../Utils/base.error.js");
const userModel = require("../Schema/user.schema.js");
const categoryModel = require("../Schema/cotegory.schema.js");
const carsModel = require("../Schema/cars.schema.js");

///         GET CATEGORY            ///
const getCategory = async (req, res, next) => {
  try {
    const categorys = await categoryModel.find();
    if (categorys.length === 0) {
      return next(BaseError.BadRequest(400, "Categoryalar topilmadi!", error));
    }
    res.status(200).json(categorys);
  } catch (error) {
    return next(
      BaseError.BadRequest(
        400,
        "Categoriyalarni korishda xatolik yuz berdi!",
        error
      )
    );
  }
};
///         GET ONE CATEGORY            ///
const getOneCategory = async (req, res, next) => {
  try {
    const category = await categoryModel.findById(req.params.id);
    if (!category) {
      return next(BaseError.BadRequest(400, "Categorya topilmadi!", error));
    }
    const cars = await carsModel.find({ markasi: category.markasi });
    res.status(200).json({ category, madellari: cars });
  } catch (error) {
    return next(
      BaseError.BadRequest(
        400,
        "Categoriyani korishda xatolik yuz berdi!",
        error
      )
    );
  }
};
///         CREATE CATEGORY         ///
const createCategory = async (req, res, next) => {
  try {
    const createCategory = await categoryModel.findOne({
      markasi: req.body.markasi,
    });
    if (createCategory) {
      return res.status(400).json({
        message: "Bu moshina markasi bazada mavjud!",
      });
    }
    const user = await userModel.findById(req.user.id)
    
    if (!user) {
      return next(BaseError.BadRequest(404, "Foydalanuvchi topilmadi!"));
    }
    const categoryData = {
      adminId: user._id,
      markasi: req.body.markasi,
      
    };
    const category = await categoryModel.create(categoryData);
    res.status(201).json({
      message: "Yangi mashina markasi qoshildi",
      category,
    });
  } catch (error) {
    return next(
      BaseError.BadRequest(
        400,
        "Categorya qoshishda xatolik yuz berdi!!!",
        error
      )
    );
  }
};
///         UPDATE CATEGORY     ///
const updateCategory = async (req, res, next) => {
  try {
    const category = await categoryModel.findById(req.params.id);
    if (!category) {
      return next(BaseError.BadRequest(400, "Categorya topilmadi!", error));
    }
    await categoryModel.findByIdAndUpdate(req.params.id, req.body);
    res.status(201).json({
      message: "Categoriya ma`lumotlari yangilandi",
    });
  } catch (error) {
    return next(
      BaseError.BadRequest(
        400,
        "Categorya malumotlarini o`zgartirishda xatolik yuz berdi!!!",
        error
      )
    );
  }
};
///         DELETE CATEGORY     ///
const deleteCategory = async (req, res, next) => {
  try {
    const category = await categoryModel.findById(req.params.id);
    if (!category) {
      return next(BaseError.BadRequest(400, "Categorya topilmadi!", error));
    }
    await categoryModel.findByIdAndDelete(req.params.id);
    res.status(201).json({
      message: "Categoriya o`chirildi",
    });
  } catch (error) {
    return next(
      BaseError.BadRequest(
        400,
        "Categoryani o`chirishda xatolik yuz berdi!!!",
        error
      )
    );
  }
};

module.exports = {
  getCategory,
  getOneCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
