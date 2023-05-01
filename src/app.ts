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


const corsOptions = {
  credentials: true,
  origin: (origin:any, callback:any) => {

      // `!origin` allows server-to-server requests (ie, localhost requests)
      if(!origin || process.env.CLIENT_URL.indexOf(origin) !== -1) {
          callback(null, true)
      } else {
          callback(new Error("Not allowed by CORS: "+ origin))
      }
  },
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))

// app.use(
//   cors({
//     credentials: true,
//     origin: process.env.CLIENT_URL,
//     // origin: true,
//   })
// );
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
