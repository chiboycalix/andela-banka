import { Pool } from 'pg';
import dotenv from 'dotenv';
import connectionString from './dbConfig';

dotenv.config();

const env = process.env.NODE_ENV;
console.log(env);
let connection;

if (process.env.ENV_TEST) {
  connection = connectionString.test;
} else {
  connection = connectionString.development;
}

const pool = new Pool({ connectionString: connection });

export default pool;
