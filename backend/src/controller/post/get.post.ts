import { getAllBlogs, getBlog } from '../../model/blog/get.blog';
import { HttpStatus } from "../../config/types/enum";
import { Request, Response } from "express";
import { getPostForFeed } from '../../model/post/get.post';

export const getPostForFeedController = async (req: Request, res: Response) => {
    try {
        const posts = await getPostForFeed();
        console.log(posts);
    } catch (e) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Error fetching blog", error: e });
        console.log(e);
    }
}
