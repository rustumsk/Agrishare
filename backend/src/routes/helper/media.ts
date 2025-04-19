import express from "express";
import upload from "../../middlewares/assets/upload";
import { authorizeUser } from "../../middlewares/auth/authorize.middleware";
import { mediaController } from "../../controller/helper/media.controller";
const mediaRouter = express.Router();

mediaRouter.post("/", upload.array("media", 10), authorizeUser, mediaController);

export default mediaRouter;