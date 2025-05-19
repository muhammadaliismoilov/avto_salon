const { required } = require("joi");
const mongoose = require("mongoose");

const carsSchema = new mongoose.Schema(
  {
    adminId:{
      type:String,
      required:false
    },
    markasi: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    year: {
      type: Number,
      required: true,
      min: 1950,
      max: 2025,
    },
    motor: {
      type: Number,
      required: true,
      min: 0,
      max: 15,
    },
    distance: {
      type: Number,
      required: true,
      min: 0,
      max: 10000000,
    },
    color: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 150,
    },
    tanirovkasi: {
      type: String,
      required: true,
      enum: ["bor", "yo'q"],
    },
    gearBook: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 150,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 500,
    },
    narxi: {
      type: Number,
      required: true,
      min: 0,
    },
    carFonImgages:[
      {
        type:String
      }
    ],
    interiorImages: [
      {
        type: String,
      },
    ],
    exteriorImages: [
      {
        type: String,
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

const carsModel = mongoose.model("cars", carsSchema);
module.exports = carsModel;
