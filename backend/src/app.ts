import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { popul } from "./config/db/populate";
import loginRouter from "./routes/public/login.route";
import { signupRouter } from "./routes/public/signup.route";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

popul();
app.use('/login', loginRouter);
app.use('/signup', signupRouter);

app.get("/", (req: Request, res:Response) => {
  res.status(200).json({ message: "Welcome to the API!" }); 
});

export default app;