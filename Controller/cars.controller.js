const carsModel = require("../Schema/cars.schema.js");
const categoryModel = require("../Schema/cotegory.schema.js");
const userModel = require("../Schema/user.schema.js")
const BaseError = require("../Utils/base.error.js");

///     GET CARS      ///
const getCars = async (req, res, next) => {
  try {
    const cars = await carsModel.find();
    if (cars.length === 0) {
      return next(BaseError.BadRequest(400, "Mashinalar topilmadi!", error));
    }
    res.status(201).json(cars);
  } catch (error) {
    return next(
      BaseError.BadRequest(400, "Mashinalar ma`lumotlari topilmadi", error)
    );
  }
};
///     GET ONE CARS      ///
const getOneCar = async (req, res, next) => {
  try {
    const car = await carsModel.findById(req.params.id);
    if (!car) {
      return next(BaseError.BadRequest(400, "Mashina topilmadi!", error))
  }
    res.status(201).json(car);
  } catch (error) {
    return next(
      BaseError.BadRequest(400, "GetOneCar bo`yicha xatolik!!!", error)
    );
  }
};
///     CREATE CAR      ///
const createCar = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user.id); 
    if (!user) {
      return next(BaseError.BadRequest(404, "Foydalanuvchi topilmadi!"));
    }
    const category = await categoryModel.findOne({markasi:req.body.markasi});
 
    if (!category) {
      return next(BaseError.BadRequest(404, "Mashina markasi topilmadi!"));
    }
    const carData = {
      adminId : user._id ,
      markasi: category.markasi,
      model: req.body.model,
      year: req.body.year,
      motor: req.body.motor,  
      distance: req.body.distance,
      color: req.body.color,
      tanirovkasi: req.body.tanirovkasi,
      gearBook: req.body.gearBook,
      description: req.body.description,
      narxi: req.body.narxi,
      interiorImages: [],
      exteriorImages: [],
    };

    const car = await carsModel.create(carData);
    res.status(201).json({
      message: "Yangi mashina madeli qoshildi",
      car,
    });
  } catch (error) {
    return next(
      BaseError.BadRequest(400, error)
    );
  }
};
///     UPDATE CAR      ///
const updateCar = async (req, res, next) => {
  try {
    const car = await carsModel.findById(req.params.id);
    if (car) {
      return next(BaseError.BadRequest(400, "Mashinalar topilmadi!", error));
    }
    await carsModel.findByIdAndUpdate(req.params.id,req.body)
    res.status(201).json({
      message:"Mashina ma`lumotlari yangilandi"
    });
  } catch (error) {
    return next(
      BaseError.BadRequest(400, "UpdateCar bo`yicha xatolik!!!", error)
    );
  }
};
///     DELETE CAR      ///
const deleteCar = async (req, res, next) => {
  try {
    const car = await carsModel.findById(req.params.id);
    if (car) {
      return next(BaseError.BadRequest(400, "Mashinalar topilmadi!", error));
    }
    await carsModel.findByIdAndDelete(req.params.id)
    res.status(201).json({
      message:"Mashina ma`lumotlari o`chirildi"
    });
  } catch (error) {
    return next(
      BaseError.BadRequest(400, "DeleteCar bo`yicha xatolik!!!", error)
    );
  }
};

module.exports = {
  getCars,
  getOneCar,
  createCar,
  updateCar,
  deleteCar
};
