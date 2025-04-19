import { Request,Response } from "express";
import { HttpStatus } from "../../config/types/enum";
import { PostMedia } from "../../config/types/types";

export const mediaController = async (req: Request, res: Response): Promise<void> => {
    try {
      const files = req.files as Express.Multer.File[];
  
      if (!files || files.length === 0) {
        res.status(HttpStatus.NOT_FOUND).json({ error: "No files uploaded." });
        return;
      }
  
      const uploads = files.map((file) => ({
        url: file.path,
        public_id: file.filename,
        resource_type: file.mimetype.startsWith("video/") ? "video" : "image",
      }));
  
      res.status(HttpStatus.OK).json({ uploads });
    } catch (err) {
      const error = err as Error;
      res.status(HttpStatus.BAD_REQUEST).json({ error: error.message || "Upload failed" });
    }
  };