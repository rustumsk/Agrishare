import Router from "express";
import { authorizeUser } from '../../middlewares/auth/authorize.middleware';
import { createPostController } from "../../controller/post/create.post";
import { getPostForFeedController } from "../../controller/post/get.post";
import { unlikePost, likePost } from "../../model/post/like.post";
const postRouter = Router();

postRouter.post('/', authorizeUser, createPostController);
postRouter.get('/feed', getPostForFeedController);
postRouter.post('/like', likePost);
postRouter.post('/unlike', unlikePost);
export default postRouter;