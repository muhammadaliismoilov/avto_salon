const { required } = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin", "superadmin"],
      default: "user",
    },
    otp: {
      type: String,
      required: false,
      default: 0,
    },
    isVerified: {
      type: Boolean,
      required: false,
      default: false,
    },
    lastTime: {
      type: Date,
      required: false,
      default: 0,
    },
    resetCode: { type: String,required:false},
    resetCodeExpiration: { type: Date ,required:false},
  },
  { timestamps: true, versionKey: false }
);

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
