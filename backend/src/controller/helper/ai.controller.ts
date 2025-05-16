import { Request,Response } from "express";
import { HttpStatus } from "../../config/types/enum";
import { summarizeContent, convertToText, chatBot } from "../../services/ai.service";

export const aiSummarizeController = async (req: Request, res: Response) => {
    const { content } = req.body;
    try {
        const summary = await summarizeContent(content);
        res.status(HttpStatus.OK).send(summary.summary);
    } catch (e) {
        console.log(e);
        res.status(HttpStatus.BAD_REQUEST).send("Bad Request");
    }
}

export const aiImageController = async (req: Request, res: Response) => { 
    const { media } = req.body;
    console.log(media);
    try{
        const data = await convertToText(media);
        console.log(data);
        res.status(HttpStatus.OK).send(data);
    }catch(e){
        console.log(e);
        res.status(HttpStatus.BAD_REQUEST).send("Bad Request");
    }
}

export const chatBotController = async (req:Request, res:Response) => {
    const { prompt } = req.body;
    try{
        const data = await chatBot(prompt);
        res.status(HttpStatus.OK).send(data);
    }catch(e){  
        console.log(e);
        res.status(HttpStatus.BAD_REQUEST).send("Bad Request");
    }
}