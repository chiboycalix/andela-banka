import bcrypt from 'bcryptjs';
import db from '../db/index';

const createUser = async (userDetails) => {
  const {
    firstName,
    lastName,
    email,
    password,
  } = userDetails;
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  const user = await db.query(
    `INSERT INTO
        users(firstName, lastName, email, password) 
    VALUES
        ($1, $2, $3, $4)
    RETURNING*`,
    [
      firstName,
      lastName,
      email,
      hashedPassword,
    ],
  ).catch(error => error.message);
  return user;
};

const checkEmail = async (email) => {
  const check = 'SELECT * FROM users WHERE email = $1 LIMIT 1';
  const mail = await db.query(check, [email]).catch(error => error.message);
  if (mail.rows[0]) {
    return true;
  }
  return false;
};


const loginUser = (userDetails) => {
  const { email } = userDetails;
  return db.query(
    'SELECT id, email, password, firstName, lastName, isAdmin, type FROM users WHERE email = $1 LIMIT 1', [email],
  ).catch(error => error.message);
};

const allAccounts = () => db.query(
  'SELECT * FROM accounts',
).catch(error => error.message);

export default {
  createUser,
  checkEmail,
  loginUser,
  allAccounts,
};
