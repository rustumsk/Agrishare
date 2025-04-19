import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { popul } from "./config/db/populate";
import loginRouter from "./routes/public/login.route";
// import blogRouter from "./routes/private/blog.route";
import postRouter from "./routes/private/post.route";
import googleRouter from "./routes/auth/google.route";
import mediaRouter from "./routes/helper/media";
import { signupRouter } from "./routes/public/signup.route";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

popul();
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/google', googleRouter);
app.use('/post', postRouter);
app.use('/media', mediaRouter);
// app.use('/blog', blogRouter);

app.get("/", (req: Request, res:Response) => {
  res.status(200).json({ message: "Welcome to the API!" }); 
});

export default app;