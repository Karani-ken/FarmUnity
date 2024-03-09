require('dotenv').config();
module.exports = {
    host: process.env.HOST,
    port:process.env.SERVERPORT,
    user:process.env.USER,
    password:process.env.DBPWD,
    database: process.env.DBNAME,     
}