const {
  refreshTokenMiddleware,
} = require("../Middleware/refreshtoken.middleware");
const userModel = require("../Schema/user.schema");
const bcryptjs = require("bcryptjs");
const BaseError = require("../Utils/base.error");
const emailSendingService =require("../Utils/email.service");
const { accessToken, refreshToken } = require("../Utils/token_generator");

///     REGISTER      ///
const register = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;
    const foundedUser = await userModel.findOne({ email });
    if (foundedUser) {
      return next(
        BaseError.BadRequest(
          409,
          "Siz ro`yxatdan o`tgansiz! Login orqali kiring"
        )
      );
    }
    const hashedpassword = await bcryptjs.hash(password, 10);
    const randomCode = Array.from({ length: 6 }, () =>
      Math.floor(Math.random() * 10)
    ).join("");

    const info = await emailSendingService(email, randomCode);
    console.log(info);
    
    if (!info) {
      return next(
        BaseError.BadRequest(500, "Email yuborishda xatolik yuz berdi!")
      );
    }
    const lastTime = new Date();
    lastTime.setMinutes(lastTime.getMinutes() + 3);

    await userModel.create({
      userName,
      email,
      password: hashedpassword,
      otp: randomCode,
      lastTime: lastTime,
    });
    res.status(201).json({
      message: `Siz roydatdan muvoffaqiyatli otdingiz va code ${email} ga yuborildi`,
    });
  } catch (error) {
    return next(    
      new BaseError.BadRequest(500, "Ro`yxatdan o`tishda xato", error)
    );
  }
};
///     VERIFY      ///
const verify = async (req, res, next) => {
  try {
    const { email, code } = req.body;
    if (!email || !code) {
      return res.status(400).json({
        message: "Email va code yuborilishi kerak!",
      });
    }
    const foundedUser = await userModel.findOne({ email });
    if (!foundedUser) {
      return next(BaseError.BadRequest(404, "Foydalanuvchi topilmadi"));
    }
    const now = new Date();
    if (foundedUser.lastTime < now) {
      return next(BaseError.BadRequest(400, "Vaqt tugagan!"));
    }

    if (code !== foundedUser.otp) {
      return next(BaseError.BadRequest(400, "Tasdiqlash kodi noto'g'ri!"));
    }
    foundedUser.isVerified = true;
    foundedUser.otp = 0;
    foundedUser.lastTime = 0;
    await foundedUser.save();
    return res.status(200).json({
      message: "Elektron pochtangizni tasdiqladingiz!",
    });
  } catch (error) {
    return next(
      new BaseError.BadRequest(
        500,
        "Verifyni tasdiqlashda xatolik!!!",
        error.message
      )
    );
  }
};
///     LOGIN     ///
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(
        BaseError.BadRequest(400, "Email va parol yuborilishi kerak!")
      );
    }

    const foundedUser = await userModel.findOne({ email });
    if (!foundedUser) {
      return next(BaseError.BadRequest(404, "Foydalanuvchi topilmadi"));
    }
    const decode = await bcryptjs.compare(password, foundedUser.password);
    if (!decode) {
      return next(BaseError.BadRequest(401, "Email yoki parol noto`g`ri!"));
    }

    if (!foundedUser.isVerified) {
      return next(
        BaseError.BadRequest(403, "Email tasdiqlanmagan! Iltimos, tasdiqlang.")
      );
    }
    const payload = {
      email: foundedUser.email,
      id: foundedUser.id,
      role: foundedUser.role,
    };
    const access = accessToken(payload);
    const refresh = refreshToken(payload);
    res.cookie("accessToken", access, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
    });
    res.cookie("refreshToken", refresh, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Elektron pochtangizni tasdiqladingiz!",
      token: access,
    });
  } catch (error) {
    return next(
      new BaseError.BadRequest(
        500,
        "Tizimga kirishda xatolik yuz berdi!"
      )
    );
  }
};
///     FORGOT PASSWORD     ///
const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ xabar: "Foydalanuvchi topilmadi" });
    }

    const randomCode = Array.from({ length: 6 }, () =>
      Math.floor(Math.random() * 10)
    ).join("");

    user.resetCode = randomCode;
    user.resetCodeExpiration = Date.now() + 600000;
    await user.save();
    await emailSendingService(email, randomCode);

    return res
      .status(200)
      .json({ xabar: "Parolni tiklash kodi emailingizga yuborildi" });
  } catch (error) {
    return next(
      new BaseError.BadRequest(
        500,
        "Parolni tiklashda xatolik yuz berdi!",
        error.message
      )
    );
  }
};
///     CHAMGE PASSWORD     ///
const changePassword = async (req, res, next) => {
  try {
    const { email, code, newPassword } = req.body;
    if (!email || !code || !newPassword) {
      return next(
        BaseError.BadRequest(
          400,
          "Email, kod va yangi parol yuborilishi kerak!"
        )
      );
    }
    const user = await userModel.findOne({
      email,
      resetCode: code,
      resetCodeExpiration: { $gt: Date.now() },
    });
    if (!user) {
      return next(
        BaseError.BadRequest(400, "Yaroqsiz yoki muddati o`tgan kod")
      );
    }

    const hashedNewPassword = await bcryptjs.hash(newPassword, 10);
    user.password = hashedNewPassword;
    user.resetCode = undefined;
    user.resetCodeExpiration = undefined;
    await user.save();

    return res.status(200).json({ xabar: "Parol muvaffaqiyatli yangilandi" });
  } catch (error) {
    return next(
      new BaseError.BadRequest(
        500,
        "Parolni yangilashda xatolik yuz berdi!",
        error.message
      )
    );
  }
};
///     LOGOUT     ///
const logout = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email kerak!" });
    }

    const foundUser = await userModel.findOne({ email });
    if (!foundUser) {
      return res.status(404).json({ message: "Foydalanuvchi topilmadi!" });
    }

    res.clearCookie("accessToken", { httpOnly: true });
    res.clearCookie("refreshToken", { httpOnly: true });

    return res.status(200).json({
      message: "Tizimdan muvaffaqiyatli chiqdingiz!",
    });
  } catch (error) {
    return next(
      new BaseError(500, "Tizimdan chiqishda xatolik yuz berdi!", error.message)
    );
  }
};

module.exports = {
  register,
  verify,
  login,
  forgotPassword,
  changePassword,
  logout,
  refreshTokenMiddleware,
};
