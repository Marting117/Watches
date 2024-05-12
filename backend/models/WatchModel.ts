import {DB} from "../core/DB";

export class WatchModel extends DB {
    async getAllWatches() {
        try {
            const [rows] = await this.conn.query("SELECT * FROM watches");
            return rows;
        } catch (e) {
            const error = e as Error
            throw new Error(error.message)
        }

    }
}