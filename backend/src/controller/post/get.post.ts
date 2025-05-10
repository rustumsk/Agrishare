import { getAllBlogs, getBlog } from '../../model/blog/get.blog';
import { HttpStatus } from "../../config/types/enum";
import { Request, Response } from "express";
import { getPostForFeed } from '../../model/post/get.post';

export const getPostForFeedController = async (req: Request, res: Response) => {
    try {
        const posts = await getPostForFeed();

        //FORMAT FOR FRONTEND RENDERING
        const transformedPosts = posts.map((post:any) => ({
            user_name: post.user_name,
            post_id: post.post_id,
            post_description: post.post_description,
            created_at: post.created_at,
            media: [
                ...post.images.map((url:string) => ({ type: 'image', url })),
                ...post.videos.map((url:string) => ({ type: 'video', url }))
            ]
        }));

        res.status(HttpStatus.OK).send(transformedPosts);
    } catch (e) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Error fetching posts", error: e });
        console.log(e);
    }
}