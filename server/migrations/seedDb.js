import db from '../db/index';

const user1 = `INSERT INTO users 
                    (firstname, lastName, email, password, type, isAdmin) 
               VALUES
                   ('staff', 'staff', 'staff@gmail.com', '$2b$10$/UOPQdaB5yFRXvQgiqsR0eLTsDczKGdeuRMc7ay0lsS6aqmbU8b2q', 'staff', true)`;
const user2 = `INSERT INTO users 
                    (firstname, lastName, email, password, type, isAdmin) 
               VALUES
                   ('admin', 'admin', 'admin@gmail.com', '$2b$10$6C7Kcbk38dV97U7fRG1WOOJC4cqFnXvRjhv9Ou.5UMbAlKy5C9296', 'admin', true)`;

db.query(`${user1};${user2}`, console.log('Table seeded'));
