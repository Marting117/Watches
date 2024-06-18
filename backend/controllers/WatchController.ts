import {Request, Response} from "express";
import {DB} from "../core/DB";
import {WatchModel} from "../models/WatchModel";
import fs from "fs";
import path from "path";
const db = new DB();
const watchModel = new WatchModel(db);


const getWatches = async (req: Request, res: Response) => {
    const data = await watchModel.getAllWatches();
    res.send(data);
}

const getWatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const data = await watchModel.getSingleWatch(parseInt(id));
        if (!data) {
            return res.status(404).json({ message: "Watch not found" });
        }
        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching watch:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const createWatch = async (req: Request, res: Response) => {
    try {
        const { brand, model, price } = req.body;
        const image_url = req.file ? req.file.filename : null;
        await watchModel.createWatch({ brand, model, price, image_url });
        res.status(201).json({ message: "Successfully created watch" });
    } catch (error) {
        res.status(400).json({ message: "Error creating watch" });
    }
};

const updateWatch = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { brand, model, price } = req.body;
        const image_url = req.file ? req.file.filename : null;
        await watchModel.updateWatch(parseInt(id), { brand, model, price, image_url });
        res.status(200).json({ message: "Successfully updated watch" });
    } catch (error) {
        res.status(400).json({ message: "Error updating watch" });
    }
};
const deleteWatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        // Get the image_url of the watch to delete
        const watch = await watchModel.getSingleWatch(parseInt(id));
        if (!watch) {
            throw new Error("Watch not found");
        }

        if (watch.image_url) {
            const imagePath = path.join(__dirname, "..", "uploads", watch.image_url);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        await watchModel.deleteWatch(parseInt(id));
        res.status(200).send("Successfully deleted watch");
    } catch (error) {
        console.error("Error deleting watch:", error);
        res.status(500).send("Failed to delete watch");
    }
};



export {getWatches, getWatch, createWatch, updateWatch, deleteWatch}