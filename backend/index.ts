// index.ts
import express from 'express';
import { DB } from "./core/DB"
import {WatchRouter} from "./routers/WatchRouter";


const app = express();


app.use(WatchRouter);


// Start server
app.listen(3000, () => {
    console.log(`Server started`);
});
