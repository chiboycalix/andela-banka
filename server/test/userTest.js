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

describe('Demo test', () => {
  it('This is demo test and actually tests nothing', () => {
    ('one').should.equal('one');
  });
});

describe('POST api/v1/auth/signup', () => {
  const correctUser = {
    firstName: 'chinonso',
    lastName: 'calix',
    email: 'igwechinonso77@gmail.com',
    password: 1234,
    type: 'client',
    isAdmin: false,
  };
  const token = jwt.sign({
    email: correctUser.email,
    id: correctUser.id,
    isAdmin: correctUser.isAdmin,
    type: correctUser.type,
  }, process.env.SECRET, { expiresIn: '1h' });
  it('should be able to signup a user with correct details', () => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send('x-access-token', token)
      .send(correctUser)
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
      });
  });

  const userWithoutFirstname = {
    lastName: 'calix',
    email: 'igwechinonso77@gmail.com',
    password: 1234,
    type: 'client',
    isAdmin: false,
  };
  it('user must provide first name', () => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send('x-access-token', token)
      .send(userWithoutFirstname)
      .end((request, response) => {
        response.should.have.status(400);
        response.body.should.have.property('error');
        response.body.error.should.equal('firstname is required');
      });
  });

  const firstnameWithSpace = {
    firstName: ' ',
    lastName: 'calix',
    email: 'igwechinonso77@gmail.com',
    password: 1234,
    type: 'client',
    isAdmin: false,
  };
  it('Spaces are not allowed in first name', () => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .set('x-access-token', token)
      .send(firstnameWithSpace)
      .end((request, response) => {
        response.should.have.status(400);
        response.body.should.have.property('error');
        response.body.error.should.equal('Spaces are not allowed');
      });
  });

  const firstnameAsNumber = {
    firstName: '6578',
    lastName: 'calix',
    email: 'igwechinonso77@gmail.com',
    password: 1234,
    type: 'client',
    isAdmin: false,
  };
  it('Firstname must be letters', () => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .set('x-access-token', token)
      .send(firstnameAsNumber)
      .end((request, response) => {
        response.should.have.status(400);
        response.body.should.have.property('error');
        response.body.error.should.equal('Firstname must be letters');
      });
  });
  const userFirstnameLength = {
    firstName: 'c',
    lastName: 'calix',
    email: 'igwechinonso77@gmail.com',
    password: 1234,
    type: 'client',
    isAdmin: false,
  };
  it('firstname must be atleast 2 alphabets long', () => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .set('x-access-token', token)
      .send(userFirstnameLength)
      .end((request, response) => {
        response.should.have.status(400);
        response.body.should.have.property('error');
        response.body.error.should.equal('first Name must be atleast 3 alphabets');
      });
  });
});
