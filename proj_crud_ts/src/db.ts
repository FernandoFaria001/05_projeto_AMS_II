// src/db.ts
import mysql from 'mysql2/promise';

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'ts_crud'
});

export default connection;
