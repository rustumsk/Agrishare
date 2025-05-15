import { Router } from "express";
export const userRouter = Router();
import { getFollowerSuggestionController,getUserForProfleController, getUserByIdController, followUserController, getMutualFollowersController, messageUserController, getMessagesController } from "../../controller/user/get.user";
import { authorizeUser } from "../../middlewares/auth/authorize.middleware";

userRouter.get('/profile', getUserForProfleController);
userRouter.get('/suggest', getFollowerSuggestionController);
userRouter.post('/follow', followUserController);
userRouter.get('/one', getUserByIdController);
userRouter.get('/mutual', getMutualFollowersController);
userRouter.post('/message', messageUserController);
userRouter.get('/messages', getMessagesController);
