import db from '../db/index';

db.query(
  'DELETE FROM transactions; DELETE FROM accounts; DELETE FROM users;',
  console.log('cleared transactions'),
);
