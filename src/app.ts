import express, { Request, Response } from "express";
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
app.use(
  cors({
    credentials: true,
    // origin: process.env.CLIENT_URL,
    origin: true,
  })
);
app.use("/api", router);
app.use(errorMiddleware);

// app.get('/', (_req: Request, res: Response) => {
//   return res.send('Express Typescript on Vercel')
// })

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    app.listen(PORT, () => console.log(`Server started on PORT =${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
