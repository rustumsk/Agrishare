import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../../config/assets/cloudinary";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => ({
    folder: "uploads",
    format: file.mimetype.startsWith("image/") ? "png" : undefined, 
    resource_type: "auto",
  }),
});

const upload = multer({ storage });

export default upload;
