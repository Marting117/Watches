import {Router} from "express";
import {createWatch, deleteWatch, getWatches, getWatch, updateWatch} from "../controllers/WatchController";

export const watchRouter = Router();
watchRouter.get("/watches", getWatches);
watchRouter.get("/watch/:id", getWatch);
watchRouter.post("/watch", createWatch);
watchRouter.put("/watch/:id", updateWatch);
watchRouter.delete("/watch/:id", deleteWatch);