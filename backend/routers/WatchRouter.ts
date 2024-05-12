import {Request, Response, Router} from "express";
import {WatchController} from "../controllers/WatchController";

export const WatchRouter = Router();

const watchController = new WatchController();

const getAllWatchesHandler = async (req: Request, res: Response) => {
    await watchController.getAllWatches(req, res);
}

WatchRouter.get('/watches',  getAllWatchesHandler)