import db from '../db/index';


const regAccount = (accountDetails) => {
  const {
    type,
    balance,
    owner,
    firstname,
    lastname,
    email,
  } = accountDetails;
  const accountnumber = Math.floor(1000000000 + Math.random() * 9000000000);
  const createdon = new Date();
  return db.query(
    `INSERT INTO
          accounts(type, balance, accountnumber, createdon, owner, firstname, lastname, email)
      VALUES
          ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING*`,
    [
      type,
      balance,
      accountnumber,
      createdon,
      owner,
      firstname,
      lastname,
      email,
    ],
  ).catch(error => error.message);
};


export default {
  regAccount,
};
