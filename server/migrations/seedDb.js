/* eslint-disable max-len */
import db from '../db/index';

const user1 = `INSERT INTO users 
                    (firstname, lastName, email, password, type, isAdmin) 
               VALUES
                   ('client', 'client', 'client@gmail.com', 'password', 'client', false)`;
const user2 = `INSERT INTO users 
                    (firstname, lastName, email, password, type, isAdmin) 
               VALUES
                   ('staff', 'staff', 'staff@gmail.com', 'password', 'staff', true)`;
const user3 = `INSERT INTO users 
                    (firstname, lastName, email, password, type, isAdmin) 
               VALUES
                   ('admin', 'admin', 'admin@gmail.com', 'password', 'admin', true)`;


const account1 = `INSERT INTO accounts 
                   (accountnumber, createdon, owner, type, status, balance) 
              VALUES
                  ('1234567890', NOW(), 1, 'savings', 'active', 20000)`;
const account2 = `INSERT INTO accounts 
                    (accountnumber, createdon, owner, type, status, balance) 
              VALUES
                    ('1234567890', NOW(), 2, 'current', 'active', 20000)`;
const account3 = `INSERT INTO accounts 
                 (accountnumber, createdon, owner, type, status, balance) 
              VALUES
                 ('1234567890', NOW(), 3, 'savings', 'active', 20000)`;


const transaction1 = `INSERT INTO transactions 
                   (createdon, type, accountnumber, cashier, amount, oldbalance, newbalance) 
              VALUES
                   (NOW(), debit , '1234567890', 1, 2000, 30000, 28000)`;
const transaction2 = `INSERT INTO transactions 
                   (createdon, type, accountnumber, cashier, amount, oldbalance, newbalance) 
              VALUES
                   (NOW(), credit , '1234567890', 2, 2000, 30000, 32000)`;
const transaction3 = `INSERT INTO transactions 
                    (createdon, type, accountnumber, cashier, amount, oldbalance, newbalance) 
              VALUES
                   (NOW(), debit , '1234567890', 1, 2000, 30000, 28000)`;

// eslint-disable-next-line max-len
db.query(user1).then(() => db.query(user2).then(() => db.query(user3).then(() => {
  db.query(account1).then(() => db.query(account2).then(() => {
    db.query(account3).then(() => db.query(transaction1).then(() => db.query(transaction2).then(() => {
      db.query(transaction3);
    })));
  }));
}))).catch(error => error.message);
