const mysql = require('mysql2');
const { config } = require('rxjs');

const configs = require('../config/config.json');

const pool = mysql.createPool({
    host: configs.host,
    user : configs.user,
    database : configs.database,
    password : config.password,
});

module.exports = pool.promise();
// go to auth to see this work