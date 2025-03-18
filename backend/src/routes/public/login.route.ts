import { Router, Response, Request } from "express";
import { localLoginController } from "../../controller/auth/user.login";
const loginRouter:Router = Router();

loginRouter.post('/', localLoginController);

export default loginRouter;