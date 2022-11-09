const mysql = require('mysql2/promise');
const config = require('../config/db_info').real;

module.exports = ()=>{
    return {
        init: ()=>{
            return mysql.createPool({
                host: config.host,
                port: config.port,
                user: config.user,
                password: config.password,
                database: config.database
            });
        }
    }
};