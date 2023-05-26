import * as mysql from "mysql2/promise"
export function init() {
    return mysql.createPool({
        host: process.env.HOST,
        port: process.env.PORT,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
    })
}