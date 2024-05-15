import {Router} from "express";
import {createWatch, getWatches, getWatch, updateWatch, deleteWatch,} from "../controllers/WatchController";


export const watchRouter = Router();
watchRouter.get("/api/watches", getWatches);
watchRouter.get("/api/watches/:id", getWatch);
watchRouter.post("/api/watch", createWatch);
watchRouter.put("/api/watch/:id", updateWatch);
watchRouter.delete("/api/watch/:id", deleteWatch);