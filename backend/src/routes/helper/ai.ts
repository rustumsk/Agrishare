import { Router } from "express";
export const aiRouter = Router();
import { aiSummarizeController, aiImageController, chatBotController } from "../../controller/helper/ai.controller";

aiRouter.post("/summarize", aiSummarizeController);
aiRouter.post("/image", aiImageController);
aiRouter.post("/chat", chatBotController);
