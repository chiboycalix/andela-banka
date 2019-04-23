import db from '../db/index';

db.query(
  'DELETE FROM transactions',
  console.log('cleared transactions table'),
).then(() => db.query(
  'DELETE FROM accounts',
  console.log('cleared accounts table'),
).then(() => db.query(
  'DELETE FROM users',
  console.log('cleared users table'),
)));
