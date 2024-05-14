import express = require("express");
import {Application, json} from "express";
import {watchRouter} from "./routers/WatchRouter";
const cors = require("cors");

const app: Application = express();

app.use(json());
app.use(cors())
app.use(watchRouter);

app.listen(3000, () => {
    console.log("Server started");
});