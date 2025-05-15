import Router from "express";
import { authorizeUser } from '../../middlewares/auth/authorize.middleware';
import { createPostController } from "../../controller/post/create.post";
import { getPostForFeedController, getCombinedController } from "../../controller/post/get.post";
import { likePostController, unlikePostController, commentPostController, getCommentPostController, getNotifsController, sendNotifController } from "../../controller/post/interact.post";
import { get } from "http";
const postRouter = Router();

postRouter.post('/', authorizeUser, createPostController);
postRouter.get('/feed', getPostForFeedController);
postRouter.post('/like', likePostController);
postRouter.post('/unlike', unlikePostController);
postRouter.post('/comment', commentPostController);
postRouter.get('/comment', getCommentPostController);
postRouter.get('/notification', getNotifsController);
postRouter.post('/notification', sendNotifController);
postRouter.get('/combined', getCombinedController);
export default postRouter;