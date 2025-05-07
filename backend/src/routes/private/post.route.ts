import Router from "express";
import { authorizeUser } from '../../middlewares/auth/authorize.middleware';
import { createPostController } from "../../controller/post/create.post";
import { getPostForFeedController } from "../../controller/post/get.post";
const postRouter = Router();

postRouter.post('/', authorizeUser, createPostController);
postRouter.get('/', getPostForFeedController);
export default postRouter;