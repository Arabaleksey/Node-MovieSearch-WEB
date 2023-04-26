import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
let cors = require('cors')
import router from "./router";
import errorMiddleware from "./middlewares/error-middlewares";

require("dotenv").config();
const PORT = 5000;
const app = express();



app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
app.use("/api", router);
app.use(errorMiddleware);

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    app.listen(PORT, () => console.log(`Server started on PORT =${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
