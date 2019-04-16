/* eslint-disable no-unused-expressions */
// eslint-disable-next-line no-unused-expressions
import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import server from '../app';

dotenv.config();
// eslint-disable-next-line no-unused-vars
const should = chai.should();

chai.use(chaiHttp);


describe('All transactions test', () => {
  const staff = {
    firstName: 'chinonso',
    lastName: 'calix',
    email: 'staff2@gmail.com',
    password: 1234,
    type: 'staff',
    isAdmin: true,
  };
  const staffToken = jwt.sign({
    email: staff.email,
    id: staff.id,
    isAdmin: staff.isAdmin,
    type: staff.type,
  }, process.env.SECRET, { expiresIn: '1h' });
  it('should be able to signup a staff with the correct details', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send('x-access-token', staffToken)
      .send(staff)
      .end((request, response) => {
        response.should.have.status(201);
        response.body.should.be.a('object');
        response.body.should.have.property('data');
        response.body.data.should.have.property('token');
        response.body.data.should.have.property('firstName');
        response.body.data.should.have.property('lastName');
        response.body.data.should.have.property('email');
        response.body.data.should.have.property('password');
        response.body.data.should.have.property('type');
        response.body.data.should.have.property('isAdmin');
        done();
      });
  });
  const debitTransaction = {
    id: 1,
    accountNumber: '0114276910',
    createdOn: '12/12/2009',
    cashier: 1,
    transactionType: 'debit',
    amount: 500,
    oldBalance: 15000,
    newBalance: 10000,
  };
  it('Only a staff can perform the debit operation', (done) => {
    chai.request(server)
      .post('/api/v1/transactions/0114276912/debit')
      .send(debitTransaction)
      .set('Authorization', `Bearer ${staffToken}`)
      .end((err, response) => {
        response.should.have.status(201);
      });
    done();
  });
  const creditTransaction = {
    id: 1,
    accountNumber: '0114276910',
    createdOn: '12/12/2009',
    cashier: 1,
    transactionType: 'debit',
    amount: 500,
    oldBalance: 15000,
    newBalance: 20000,
  };
  it('Only a staff can perform the debit operation', (done) => {
    chai.request(server)
      .post('/api/v1/transactions/0114276912/credit')
      .send(creditTransaction)
      .set('Authorization', `Bearer ${staffToken}`)
      .end((err, response) => {
        response.should.have.status(201);
      });
    done();
  });

  it('Only a staff or logged in user can perform this operation', (done) => {
    chai.request(server)
      .get('/api/v1/transactions/0114276912/transactions')
      .end((err, response) => {
        response.should.have.status(200);
      });
    done();
  });
  it('Only a staff or logged in user can perform this operation', (done) => {
    chai.request(server)
      .get('/api/v1/transactions/0114276912/transactions/2')
      .end((err, response) => {
        response.should.have.status(200);
      });
    done();
  });

  const invalidTransaction = {
    id: 1,
    accountNumber: '0114276910',
    createdOn: '12/12/2009',
    cashier: 1,
    transactionType: 'debit',
    amount: 25000,
    oldBalance: 15000,
    newBalance: 10000,
  };

  it('Only a staff or logged in user can perform this operation', (done) => {
    chai.request(server)
      .post('/api/v1/transactions/0114276912/debit')
      .set('Authorization', `Bearer ${staffToken}`)
      .send(invalidTransaction)
      .end((err, response) => {
        response.should.have.status(403);
        response.body.should.have.property('error');
        response.body.error.should.equal('Insufficient Balance');
      });
    done();
  });
});
