const express = require("express");
const cors = require("cors");
require("dotenv").config();
const error_middeleware = require("./Middleware/error.middleware");
const categoryRouter = require("./Routes/category.routes");
const carsRouter = require("./Routes/cars.routes");
const userRouter = require("./Routes/user.routes");
const authRouter = require("./Routes/auth.routes");
const upload = require("./Routes/upload.routes");
const logger = require("./Utils/logger")
const cookieParser = require("cookie-parser");
const { connectDB } = require("./Config/confi.db");
const swaggerDocument = require("./Utils/swagger");
const swaggerUiExpress =require("swagger-ui-express")
const app = express();
const PORT = process.env.PORT || 4001;
app.use(cors());
app.use(express.json());
app.use(categoryRouter);
app.use(carsRouter);
app.use(userRouter);
app.use(authRouter);
app.use(upload);
app.use(cookieParser());
app.use(`/api-docs`,swaggerUiExpress.serve,swaggerUiExpress.setup(swaggerDocument))
connectDB();
app.use(error_middeleware);
app.use((req, res, next) => {
  res.status(404).json({
    message: "Bunday endpoint mavjud emas!",
  });
});
app.listen(PORT, () => {
  console.log(`Server ${PORT} da ishladi`),
  logger.info(`Server ${PORT} da ishladi`)
});
