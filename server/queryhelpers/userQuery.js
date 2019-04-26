import bcrypt from 'bcryptjs';
import db from '../db/index';
/**
 * Create user query
 *
 * @param {*} userDetails
 * @returns
 */
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
/**
 * Check if email exists
 *
 * @param {*} email
 * @returns
 */
const checkEmail = async (email) => {
  const check = 'SELECT * FROM users WHERE email = $1 LIMIT 1';
  const mail = await db.query(check, [email]).catch(error => error.message);
  if (mail.rows[0]) {
    return true;
  }
  return false;
};

/**
 * Login a user
 *
 * @param {*} userDetails
 * @returns
 */
const loginUser = (userDetails) => {
  const { email } = userDetails;
  return db.query(
    'SELECT id, email, password, firstName, lastName, isAdmin, type FROM users WHERE email = $1 LIMIT 1', [email],
  ).catch(error => error.message);
};
/**
 * Check if user account exists using email
 *
 * @param {*} email
 * @returns
 */
const checkAccount = async (email) => {
  const check = 'SELECT * FROM accounts WHERE email = $1 LIMIT 1';
  const accNum = await db.query(check, [email]).catch(error => error.message);
  if (accNum.rows[0]) {
    return true;
  }
  return false;
};
/**
 * Get all accounts created by an email address
 *
 * @param {object} email
 */
const allAccounts = email => db.query(
  `SELECT * FROM accounts WHERE email = '${email}'`,
).catch(error => error.message);

export default {
  createUser,
  checkEmail,
  loginUser,
  allAccounts,
  checkAccount,
};
