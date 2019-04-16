import { Pool } from 'pg';
import dotenv from 'dotenv';
import connectionString from './dbConfig';

dotenv.config();

const env = process.env.NODE_ENV;
console.log(env);
let connection;

if (env === 'development') {
  connection = connectionString.development;
} else if (env === 'production') {
  connection = connectionString.production;
}

const pool = new Pool(connection);

export default pool;
