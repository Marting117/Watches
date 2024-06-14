export class WatchModel {
    conn; // Assuming db connection object

    constructor(db: any) {
        this.conn = db.conn;
    }

    async getAllWatches() {
        const [rows] = await this.conn.query("SELECT * FROM watches");
        return rows;
    }

    async getSingleWatch(id: number) {
        const [rows] = await this.conn.query("SELECT * FROM watches WHERE id = ?", [id]);
        return rows[0];
    }

    async createWatch(watchData: any) {
        await this.conn.execute("INSERT INTO watches (brand, model, price, image_url) VALUES(?, ?, ?, ?)",
            [watchData.brand, watchData.model, watchData.price, watchData.image_url]);
    }

    async updateWatch(id: number, watchData: any): Promise<boolean> {
        const updateWatchDataArray = Object.entries(watchData);
        let setStatement = "";
        let preparedStatementData = [];
        for (let i = 0; i < updateWatchDataArray.length; i++) {
            setStatement += `${updateWatchDataArray[i][0]} = ?`;
            setStatement += (i + 1 !== updateWatchDataArray.length) ? ", " : " ";
            preparedStatementData.push(updateWatchDataArray[i][1]);
        }
        preparedStatementData.push(id);
        await this.conn.execute(`UPDATE watches SET ${setStatement} WHERE id = ?`, preparedStatementData);
        return true;
    }

    async deleteWatch(id: number) {
        await this.conn.execute('DELETE FROM watches WHERE id = ?', [id]);
    }
}
