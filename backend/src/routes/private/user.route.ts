import { Router } from "express";
export const userRouter = Router();
import { getFollowerSuggestionController, getUserByIdController, followUserController, getMutualFollowersController } from "../../controller/user/get.user";
import { authorizeUser } from "../../middlewares/auth/authorize.middleware";

userRouter.get('/suggest', getFollowerSuggestionController);
userRouter.post('/follow', followUserController);
userRouter.get('/one', getUserByIdController);
userRouter.get('/mutual', getMutualFollowersController);
