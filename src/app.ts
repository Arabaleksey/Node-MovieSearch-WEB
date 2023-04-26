import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./router";
import errorMiddleware from "./middlewares/error-middlewares";

require("dotenv").config();
const PORT = 5000;
const app = express();

app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  credentials: true,
  origin: process.env.CLIENT_URL,
  optionSuccessStatus:200
}
app.use(cors(corsOptions));
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
