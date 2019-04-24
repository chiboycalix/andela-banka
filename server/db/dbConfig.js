import dotenv from 'dotenv';

dotenv.config();

const connectionString = {};

connectionString.development = process.env.DATABASE_URL;

connectionString.test = process.env.TEST_DATABASE_URL;


export default connectionString;
