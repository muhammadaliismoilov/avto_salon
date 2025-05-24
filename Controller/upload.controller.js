const multer = require("multergi ");
const path = require("path");
const BaseError = require("../Utils/base.error");

const uploadFile = path.join(__dirname, "../upload/images");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadFile);
  },
  filename: (req, file, cb) => {
    const fieldName = file.fieldname.replace("Img", "").toLowerCase();
    cb(null, `${fieldName}${path.extname(file.originalname)}`);
  },
});

const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error("Faqat JPEG, JPG yoki PNG formatdagi rasm fayllarini yuklash mumkin!"));
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter,
});

const categoryImg = [
  upload.single("category_img"),
  (req, res, next) => {
    if (!req.file) return next(BaseError.BadRequest(400, "Rasm yuklanmadi!"));
    const pathUrl = `/upload/images/${req.file.filename}`;
    res.status(200).json({ message: "Category rasmi yuklandi!", file: pathUrl });
  },
];

const carFonImg = [
  upload.single("car_fon_img"),
  (req, res, next) => {
    if (!req.file) return next(BaseError.BadRequest(400, "Rasm yuklanmadi!"));
    const pathUrl = `/upload/images/${req.file.filename}`;
    res.status(200).json({ message: "Car fon rasmi yuklandi!", file: pathUrl });
  },
];

const interiorImg = [
  upload.single("interior_img"),
  (req, res, next) => {
    if (!req.file) return next(BaseError.BadRequest(400, "Rasm yuklanmadi!"));
    const pathUrl = `/upload/images/${req.file.filename}`;
    res.status(200).json({ message: "Interior rasmi yuklandi!", file: pathUrl });
  },
];

const exteriorImg = [
  upload.single("exterior_img"),
  (req, res, next) => {
    if (!req.file) return next(BaseError.BadRequest(400, "Rasm yuklanmadi!"));
    const pathUrl = `/upload/images/${req.file.filename}`;
    res.status(200).json({ message: "Exterior rasmi yuklandi!", file: pathUrl });
  },
];

module.exports={
    categoryImg,
    carFonImg,
    interiorImg,
    exteriorImg
}
