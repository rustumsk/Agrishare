import { Router } from "express";
import { createBlogController } from "../../controller/blog/create.blog";
import { authorizeUser } from "../../middlewares/auth/authorize.middleware";
const blogRouter: Router = Router();

blogRouter.post('/', authorizeUser, createBlogController);

export default blogRouter;