import {WatchModel} from "../models/WatchModel";
import {Request, Response} from "express";

export class WatchController {
    private watchModel : WatchModel;

    constructor() {
        this.watchModel = new WatchModel();
    }

    async getAllWatches(req: Request, res: Response) {
        const watches = await this.watchModel.getAllWatches();
        res.send(watches);
    }
}
