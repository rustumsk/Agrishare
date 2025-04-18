import Router from "express";
import { authorizeUser } from '../../middlewares/auth/authorize.middleware';
import { createPostController } from "../../controller/post/create.post";
const postRouter = Router();

postRouter.post('/', authorizeUser, createPostController);
export default postRouter;