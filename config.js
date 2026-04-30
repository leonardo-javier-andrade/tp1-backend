import mysql from 'mysql2/promise';

const db = mysql.createPool({
host: 'localhost',
user: 'root',
password: '',
database: 'tp_backend',
waitForConnections: true,
connectionLimit: 10,
})

export {db}