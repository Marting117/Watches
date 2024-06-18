import express = require("express");
import { Application, json } from "express";
import { watchRouter } from "./routers/WatchRouter";
import fs from 'fs';

const path = require('path');
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

const cors = require("cors");

const app: Application = express();

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(json());
app.use(cors());
app.use(watchRouter);

app.delete('/api/delete-image/:imageName', (req, res) => {
    const { imageName } = req.params;
    const imagePath = path.join(__dirname, 'uploads', imageName);

    fs.unlink(imagePath, (err) => {
        if (err) {
            console.error('Error deleting image:', err);
            res.status(500).json({ error: 'Failed to delete image' });
        } else {
            res.status(200).json({ message: 'Image deleted successfully' });
        }
    });
});

app.listen(3001, () => {
    console.log("Server started");
});
