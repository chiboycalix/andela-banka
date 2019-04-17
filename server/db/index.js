import { Pool } from 'pg';
import dotenv from 'dotenv';
import connectionString from './dbConfig';

dotenv.config();

const env = process.env.NODE_ENV;
console.log(env);
let connection;

if (env === 'production') {
  connection = connectionString.production;
} else if (env === 'test') {
  connection = connectionString.test;
} else {
  connection = connectionString.development;
}

const pool = new Pool(connection);

export default pool;
