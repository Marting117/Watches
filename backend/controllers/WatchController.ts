import {Request, Response} from "express";
import {DB} from "../core/DB";
import {WatchModel} from "../models/WatchModel";

const db = new DB();
const watchModel = new WatchModel(db);


const getWatches = async (req: Request, res: Response) => {
    const data = await watchModel.getAllWatches();
    res.send(data);
}

const getWatch = async (req: Request, res: Response) => {
    const {id} = req.params;
    const data = await watchModel.getSingleWatch(parseInt(id));
    res.send(data);
}
const createWatch = async (req: Request, res: Response) => {
    const data = req.body;
    await watchModel.createWatch(data)
    res.send("Successfully created watch");
}
const updateWatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const watchData = req.body;
    await watchModel.updateWatch(parseInt(id), watchData);
    res.send("Successfully updated watch");
}
const deleteWatch = async (req: Request, res: Response) => {
    const {id} = req.params;
    await watchModel.deleteWatch(parseInt(id));
    res.send("Successfully deleted watch");
}


export {getWatches, getWatch, createWatch, updateWatch, deleteWatch}