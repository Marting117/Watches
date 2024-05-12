import mysql2 from "mysql2";


export class DB {
    conn;

    constructor() {
        this.conn = mysql2.createPool({
            database: "watches",
            host: "localhost",
            user: "root",
            password: ""
        }).promise();
    }
}