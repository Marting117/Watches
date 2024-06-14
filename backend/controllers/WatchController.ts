import {Request, Response} from "express";
import {DB} from "../core/DB";
import {WatchModel} from "../models/WatchModel";
import upload from "../multer-config"; // Import Multer configuration

const db = new DB();
const watchModel = new WatchModel(db);


const getWatches = async (req: Request, res: Response) => {
    const data = await watchModel.getAllWatches();
    res.send(data);
}

const getWatch = async (req: Request, res: Response) => {
        const {id} = req.params;
        const data = await watchModel.getSingleWatch(parseInt(id));
        res.status(200).send(data);

}
const createWatch = async (req: Request, res: Response) => {
    try {
        const { brand, model, price } = req.body;
        const image_url = req.file ? req.file.path : null; // Check if file was uploaded
        await watchModel.createWatch({ brand, model, price, image_url });
        res.status(201).json({ message: "Successfully created watch" });
    } catch (error) {
        res.status(400).json({ message: "Error creating watch" });
    }
}

const updateWatch = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { brand, model, price } = req.body;
        const image_url = req.file ? req.file.path : null; // Check if file was uploaded
        await watchModel.updateWatch(parseInt(id), { brand, model, price, image_url });
        res.status(200).json({ message: "Successfully updated watch" });
    } catch (error) {
        res.status(400).json({ message: "Error updating watch" });
    }
}
const deleteWatch = async (req: Request, res: Response) => {
    const {id} = req.params;
    await watchModel.deleteWatch(parseInt(id));
    res.status(200).send("Successfully deleted watch");
}


export {getWatches, getWatch, createWatch, updateWatch, deleteWatch}