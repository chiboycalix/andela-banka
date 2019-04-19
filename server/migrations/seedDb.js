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


// eslint-disable-next-line max-len
db.query(user1).then(() => db.query(user2).then(() => db.query(user3))).catch(error => error.message);
