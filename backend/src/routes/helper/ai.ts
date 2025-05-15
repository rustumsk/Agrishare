import { Router } from "express";
export const aiRouter = Router();
import { aiSummarizeController, aiImageController } from "../../controller/helper/ai.controller";

aiRouter.post("/summarize", aiSummarizeController);
aiRouter.post("/image", aiImageController);
