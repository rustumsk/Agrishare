import { Router, Response, Request } from "express";

const loginRouter:Router = Router();

loginRouter.get('/', (req:Request,res:Response) =>{
    res.send("Hello from login body!");
})

export default loginRouter;