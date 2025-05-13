import Router from "express";
import { authorizeUser } from '../../middlewares/auth/authorize.middleware';
import { createPostController } from "../../controller/post/create.post";
import { getPostForFeedController } from "../../controller/post/get.post";
import { likePostController, unlikePostController, commentPostController } from "../../controller/post/interact.post";
const postRouter = Router();

postRouter.post('/', authorizeUser, createPostController);
postRouter.get('/feed', getPostForFeedController);
postRouter.post('/like', likePostController);
postRouter.post('/unlike', unlikePostController);
postRouter.post('/comment', commentPostController)
export default postRouter;