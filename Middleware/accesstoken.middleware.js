
const BaseError = require("../Utils/base.error");
const jwt = require("jsonwebtoken");

const chekAdmin = async (req, res, next) => {
  try {
  
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return next(BaseError.Unauthorized(401, "Token topilmadi!"));
    }

    const accessToken = authHeader.split(" ")[1]; 

    
    const decode = jwt.verify(accessToken, process.env.ACCESS_SECRET_KEY);
    req.user = decode;

    
    const role = ["admin", "superadmin"];
    if (!role.includes(req.user.role)) {
      return next(BaseError.Unauthorized(403, "Sizda bunday ruxsat yo`q!"));
    }

    next();
  } catch (error) {
    
    return next(BaseError.Unauthorized(401, "Noto`g`ri yoki muddati o`tgan token!"));
  }
};

module.exports = chekAdmin;