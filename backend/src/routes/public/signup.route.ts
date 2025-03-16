import {Router, Request, Response} from 'express';
import { localSignupController } from '../../controller/user/create.user';
export const signupRouter:Router = Router();

signupRouter.post('/', localSignupController);