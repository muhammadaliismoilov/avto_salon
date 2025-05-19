const userModel = require("../Schema/user.schema.js");
const carsModel = require("../Schema/cars.schema.js");
const categoryModel = require("../Schema/cotegory.schema.js");
const BaseError = require("../Utils/base.error.js");

const getUser = async (req, res, next) => {
  try {
    const user = await userModel.find();
    if (user.length === 0) {
      return next(BaseError.BadRequest(400, "Foydalanuvchi topilmadi!", error));
    }
    res.status(201).json(user);
  } catch (error) {
    return next(
      BaseError.BadRequest(
        400,
        "Foydalanuvchilar ma`lumotlari topilmadi",
        error
      )
    );
  }
};

const getOneUser = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) {
      return next(BaseError.BadRequest(400, "Foydalanuvchi topilmadi!", error));
    }
    let cars = [];
    let categorys = [];
    if (user.role === "admin" || user.role === "superadmin") {
      let car = await carsModel.find({ adminId: user._id });
      let category = await categoryModel.find({ adminId: user._id });
      categorys = category;
      cars = car;
    }

    res.status(201).json({
      user: user,
      categorys: categorys,
      cars: cars,
    });
  } catch (error) {
    return next(
      BaseError.BadRequest(400, "Foydalanuvchi ma`lumotlari topilmadi", error)
    );
  }
};

const updateUser = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) {
      return next(BaseError.BadRequest(400, "Foydalanuvchi topilmadi!", error));
    }
    const userDate = await userModel.findByIdAndUpdate(req.params.id, req.body);
    res.status(201).json(userDate);
  } catch (error) {
    return next(
      BaseError.BadRequest(400, "Foydalanuvchi ma`lumotlari topilmadi", error)
    );
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) {
      return next(BaseError.BadRequest(400, "Foydalanuvchi topilmadi!", error));
    }
    const userDate = await userModel.findByIdAndDelete(req.params.id);
    res.status(201).json(userDate);
  } catch (error) {
    return next(
      BaseError.BadRequest(400, "Foydalanuvchi ma`lumotlari topilmadi", error)
    );
  }
};

module.exports = {
  getUser,
  getOneUser,
  updateUser,
  deleteUser,
};
