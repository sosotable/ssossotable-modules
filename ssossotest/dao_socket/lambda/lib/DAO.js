import { init } from "../config/dbConnection.js";

export class DAO {
    // MARK: singleton
    static DAOInstance;
    static connection;
    constructor() {
        // MARK: 싱글톤 객체 지정
        if (!DAO.DAOInstance) {
            DAO.DAOInstance = this;
        }
    }

    // MARK: DB 연결 설립
    async init() {
        DAO.connection = await init();
    }
    // MARK: DB 연결 해제
    async end() {
        await DAO.connection.end();
    }
    getInstance() {
        return DAO.DAOInstance;
    }
    async insert(table, columns, values) {
        try {
            /** MARK:
             *  colmumns 가 undefined 키워드 즉 입력되지 않은 경우 생략하고 모든 열에 입력됨
             * */
            if (columns === undefined) {
                await DAO.connection.query(
                    `INSERT INTO ` + `${table} ` + `VALUES(${values})`
                );
            } else {
                await DAO.connection.query(
                    `INSERT INTO ` + `${table}(${columns}) ` + `VALUES(${values})`
                );
            }
        } catch (e) {
            console.error(e);
        }
    }
    async select(columns, table, where) {
        try {
            /** MARK:
             *  where 매개변수를 입력하지 않는 경우 모든 열 검색
             * */
            if (where === undefined) {
                const [rows, fields] =
                    await DAO.connection.query(
                        `SELECT ` + `${columns} ` + `FROM ` + `${table}`
                    );
                return rows;
            } else {
                const [rows, fields] =
                    await DAO.connection.query(
                        `SELECT ` + `${columns} ` + `from ` + `${table} ` + `WHERE ${where}`
                    );
                return rows;
            }
        } catch (e) {
            console.error(e);
        }
    }
    async update(table, set, where) {
        try {
            await DAO.connection.query(
                `UPDATE ` + `${table} ` + `SET ${set} ` + `WHERE ${where}`
            );
        } catch (e) {
            console.error(e);
        }
    }
    async delete(table, where) {
        try {
            await DAO.connection.query(
                `DELETE ` + `FROM ` + `${table} ` + `WHERE ${where}`
            );
        } catch (e) {
            console.error(e);
        }
    }
}