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

describe('All Account tests', () => {
  const clientToken = jwt.sign({
    email: 'igwechinonso77@gmail.com',
    id: 1,
    isAdmin: false,
    type: 'client',
  }, process.env.SECRET, { expiresIn: '1h' });
  const account = {
    id: 1,
    accountNumber: '0114276912',
    createdOn: '12/12/2009',
    owner: 1,
    type: 'savings',
    status: 'active',
    balance: 50000.32,
  };
  it('only a logged in user should be able to create an account', (done) => {
    chai.request(server)
      .post('/api/v1/accounts')
      .send(account)
      .set('Authorization', `Bearer ${clientToken}`)
      .end((err, response) => {
        response.should.have.status(201);
      });
    done();
  });

  it('you should not be able to create account if you are not logged in', (done) => {
    chai.request(server)
      .post('/api/v1/accounts')
      .send(account)
      .end((err, response) => {
        response.should.have.status(401);
        response.body.should.have.property('error');
        response.body.error.should.equal('Unauthorized');
      });
    done();
  });

  const staff = {
    firstName: 'chinonso',
    lastName: 'calix',
    email: 'staff@gmail.com',
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
        done();
      });
  });
  const updatedAccount = {
    id: 1,
    accountNumber: '0114276912',
    createdOn: '12/12/2009',
    owner: 1,
    type: 'savings',
    status: 'dormant',
    balance: 50000.32,
  };
  it('only a staff can update an account', (done) => {
    chai.request(server)
      .patch('/api/v1/accounts/0114276912')
      .send(updatedAccount)
      .set('Authorization', `Bearer ${staffToken}`)
      .end((err, response) => {
        response.should.have.status(200);
      });
    done();
  });

  it('only an a staff should be able to get all accounts', (done) => {
    chai.request(server)
      .get('/api/v1/accounts')
      .set('Authorization', `Bearer ${staffToken}`)
      .end((err, response) => {
        response.should.have.status(200);
      });
    done();
  });

  it('only an a staff should be able to get a single account number', (done) => {
    chai.request(server)
      .get('/api/v1/accounts/0114276912')
      .set('Authorization', `Bearer ${staffToken}`)
      .end((err, response) => {
        response.should.have.status(200);
      });
    done();
  });

  it('only an a staff should be able to delete an account number', (done) => {
    chai.request(server)
      .delete('/api/v1/accounts/0114276912')
      .set('Authorization', `Bearer ${staffToken}`)
      .end((err, response) => {
        response.should.have.status(200);
      });
    done();
  });
});
