import db from '../db/index';

db.query(
  `CREATE TABLE IF NOT EXISTS users(
    id serial NOT NULL,
    firstname character varying(100),
    lastname character varying(100),
    email character varying(100),
    password character varying(100),
    isadmin boolean DEFAULT false,
    type character varying(100) DEFAULT 'client'::character varying,
    CONSTRAINT users_pkey PRIMARY KEY (id)
  )`,
  console.log('Users Table created'),
).then(() => db.query(
  `CREATE TABLE accounts
  (
    id serial NOT NULL,
    firstname character varying(100),
    lastname character varying(100),
    email character varying(100),
    accountnumber bigint,
    balance numeric,
    type character varying(100),
    owner integer,
    status character varying(100) DEFAULT 'draft'::character varying,
    createdon timestamp without time zone,
    CONSTRAINT accounts_pkey PRIMARY KEY (id),
    CONSTRAINT accounts_owner_fkey FOREIGN KEY (owner)
        REFERENCES users (id) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE NO ACTION
  )`,
  console.log('Accounts Table created'),
).then(() => db.query(
  `CREATE TABLE transactions
  (
    id serial NOT NULL,
    createdon timestamp without time zone,
    type character varying(100),
    accountnumber bigint,
    amount numeric,
    oldbalance numeric,
    newbalance numeric,
    cashier integer,
    CONSTRAINT transactions_pkey PRIMARY KEY (id),
    CONSTRAINT transactions_cashier_fkey FOREIGN KEY (cashier)
        REFERENCES users (id) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE NO ACTION
  )`,
  console.log('Transactions Table created'),
))).catch(error => error.message);
