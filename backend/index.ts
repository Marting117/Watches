import express = require("express");
import {Application, json} from "express";
import {watchRouter} from "./routers/WatchRouter";
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

app.listen(3001, () => {
    console.log("Server started");
});