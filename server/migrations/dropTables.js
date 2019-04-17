import db from '../db/index';

db.query(
  'DROP TABLE IF EXISTS transactions CASCADE',
  console.log('Tranactions Table dropped'),
).then(() => db.query(
  'DROP TABLE IF EXISTS accounts CASCADE',
  console.log('Accounts Table dropped'),
).then(() => db.query(
  'DROP TABLE IF EXISTS users CASCADE',
  console.log('Users Table dropped'),
))).catch(error => error.message);
