import {Router} from 'express';
import { signUpController } from '../../controller/user/create.user';
export const signupRouter:Router = Router();

signupRouter.post('/', signUpController);