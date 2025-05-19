const BaseError = require("../Utils/base.error");
const jwt = require("jsonwebtoken");
const { refreshToken, accessToken } = require("../Utils/token_generator");

// const refreshTokenMiddleware = (req, res, next) => {
//   const Token = req.headers.cookie;
//   if (!Token) {
//     throw BaseError.Unauthorized("Token topilmadi");
//   }
//   const refresh = Token.split(" ")[1].slice(13);

//   if (!refresh) {
//     throw BaseError.Unauthorized("Refersh   Token topilmadi");
//   }
//   const decode = jwt.verify(refresh, process.env.REFRESH_SEKRET_KEY);

//   if (!decode) {
//     throw BaseError.Unauthorized("Token topilmadi");
//   }

//   req.user = decode;
//   const payload = {
//     email: req.user.email,
//     id: req.user.id,
//     role: req.user.role,
//   };
//   const accessResult = accessToken(payload);
//   const refreshResult = refreshToken(payload);
//   res.cookie("accessToken", accessResult, {
//     httpOnly: true,
//     maxAge: 15 * 60 * 1000,
//   });
//   res.cookie("refreshToken", refreshResult, {
//     httpOnly: true,
//     maxAge: 7 * 24 * 60 * 60 * 1000,
//   });

//   return next();
// };

// module.exports = {
//   refreshTokenMiddleware,
// };
const refreshTokenMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw BaseError.Unauthorized("Refresh token topilmadi");
  }

  const refresh = authHeader.split(" ")[1];

  let decode;
  try {
    decode = jwt.verify(refresh, process.env.REFRESH_SEKRET_KEY);
  } catch (error) {
    throw BaseError.Unauthorized("Refresh token yaroqsiz");
  }

  req.user = decode;
  const payload = {
    email: req.user.email,
    id: req.user.id,
    role: req.user.role,
  };

  const accessResult = accessToken(payload);
  const refreshResult = refreshToken(payload);

  res.cookie("accessToken", accessResult, {
    httpOnly: true,
    maxAge: 15 * 60 * 1000,
  });

  res.cookie("refreshToken", refreshResult, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return next();
};
module.exports = {
  refreshTokenMiddleware,
};