import { getAllBlogs, getBlog } from '../../model/blog/get.blog';
import { HttpStatus } from "../../config/types/enum";
import { Request, Response } from "express";

export const getBlogController = async (req: Request, res: Response) => {
    const { id, user_id } = req.params;
    try {
        const blogs = await getBlog(Number(id), user_id);
        res.status(HttpStatus.OK).json(blogs);
    } catch (e) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Error fetching blog", error: e });
        console.log(e);
    }
}

export const getAllBlogsController = async (req: Request, res: Response) => {
    try {
        const blogs = await getAllBlogs();
        res.status(HttpStatus.OK).json(blogs);
    } catch (e) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Error fetching blog", error: e });
        console.log(e);
    }
}