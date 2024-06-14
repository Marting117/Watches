import {Router} from "express";
import {createWatch, getWatches, getWatch, updateWatch, deleteWatch,} from "../controllers/WatchController";
import upload from "../multer-config"; // Import Multer configuration

export const watchRouter = Router();
watchRouter.get("/api/watches", getWatches);
watchRouter.get("/api/watches/:id", getWatch);
watchRouter.post("/api/watch", upload.single('image'), createWatch); // Handle file upload for create operation
watchRouter.put("/api/watch/:id", upload.single('image'), updateWatch); // Handle file upload for update operation
watchRouter.delete("/api/watch/:id", deleteWatch);