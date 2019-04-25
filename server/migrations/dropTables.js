import db from '../db/index';

db.query(
  'DROP TABLE IF EXISTS transactions CASCADE;DROP TABLE IF EXISTS accounts CASCADE;DROP TABLE IF EXISTS users CASCADE;', console.log('Tables dropped'),
);
