import {Router} from "express";
import {createWatch, getWatches, getWatch, updateWatch, deleteWatch,} from "../controllers/WatchController";
import upload from "../multer-config";

export const watchRouter = Router();
watchRouter.get("/api/watches", getWatches);
watchRouter.get("/api/watches/:id", getWatch);
watchRouter.post("/api/watch", upload.single('image'), createWatch);
watchRouter.put("/api/watch/:id", upload.single('image'), updateWatch);
watchRouter.delete("/api/watch/:id", deleteWatch);