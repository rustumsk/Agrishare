import { Router } from "express";
import { createBlogController } from "../../controller/blog/create.blog";
import { authorizeUser } from "../../middlewares/auth/authorize.middleware";
import { getAllBlogsController, getBlogController } from "../../controller/blog/get.blog";
import { likeBlogController, unlikeBlogController, commentBlogController } from "../../controller/blog/interact.blog";
const blogRouter: Router = Router();

blogRouter.post('/', authorizeUser, createBlogController);
blogRouter.get('/', authorizeUser, getAllBlogsController);
blogRouter.get('/:id/:user_id', getBlogController);
blogRouter.post('/like', authorizeUser, likeBlogController);
blogRouter.post('/unlike', authorizeUser, unlikeBlogController);
blogRouter.post('/comment', authorizeUser, commentBlogController);



export default blogRouter;