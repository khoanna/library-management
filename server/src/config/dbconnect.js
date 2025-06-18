const mysql = require('mysql2/promise');  // Sử dụng mysql2 với promise
require("dotenv").config();


const host = process.env.host;
const port = Number(process.env.port); 
const user = process.env.user;
const password = process.env.password;
const database = process.env.database;

async function createConnection() {
  try {
    const connection = await mysql.createConnection({
      host: host,
      port: port,
      user: user,
      password: password,
      database: database,
    });

    return connection;
  } catch (error) {
    console.error('Error creating connection:', error);
    throw error;
  }
}

module.exports = createConnection;  // Export hàm tạo kết nối
