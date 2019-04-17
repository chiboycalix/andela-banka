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

  const userWithoutLastname = {
    firstName: 'chinonso',
    email: 'igwechinonso77@gmail.com',
    password: 1234,
    type: 'client',
    isAdmin: false,
  };
  it('user must provide last name', () => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send('x-access-token', token)
      .send(userWithoutLastname)
      .end((request, response) => {
        response.should.have.status(400);
        response.body.should.have.property('error');
        response.body.error.should.equal('lastname is required');
      });
  });
  const userWithoutEmail = {
    firstName: 'chinonso',
    lastName: 'calix',
    password: 1234,
    type: 'client',
    isAdmin: false,
  };
  it('user must provide email', () => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send('x-access-token', token)
      .send(userWithoutEmail)
      .end((request, response) => {
        response.should.have.status(400);
        response.body.should.have.property('error');
        response.body.error.should.equal('email is required');
      });
  });
  const userWithInvalidEmail = {
    firstName: 'chinonso',
    lastName: 'calix',
    email: 'chi@gmail',
    password: 1234,
    type: 'client',
    isAdmin: false,
  };
  it('user must provide a valid email', () => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send('x-access-token', token)
      .send(userWithInvalidEmail)
      .end((request, response) => {
        response.should.have.status(400);
        response.body.should.have.property('error');
        response.body.error.should.equal('Please provide a valid email');
      });
  });

  const userWithoutPassword = {
    firstName: 'chinonso',
    lastName: 'calix',
    email: 'chi@gmail.com',
    type: 'client',
    isAdmin: false,
  };
  it('user must provide a password', () => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send('x-access-token', token)
      .send(userWithoutPassword)
      .end((request, response) => {
        response.should.have.status(400);
        response.body.should.have.property('error');
        response.body.error.should.equal('password is required');
      });
  });

  const correctUser1 = {
    firstName: 'chinonso',
    lastName: 'calix',
    email: 'igwechinonso77@gmail.com',
    password: 1234,
    type: 'client',
    isAdmin: false,
  };
  const token1 = jwt.sign({
    email: correctUser1.email,
    id: correctUser1.id,
    isAdmin: correctUser1.isAdmin,
    type: correctUser1.type,
  }, process.env.SECRET, { expiresIn: '1h' });

  it('You must not register two users with the same Email', () => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send('x-access-token', token1)
      .send(correctUser1)
      .send(correctUser1)
      .end((request, response) => {
        response.should.have.status(409);
        response.body.should.have.property('error');
        response.body.error.should.equal('email exist');
      });
  });
});

describe('GET /auth/login', () => {
  it('it should log in the user', (() => {
    const loginDetails = {
      email: 'igwechinonso77@gmail.com',
      password: 1234,
    };
    chai.request(server)
      .post('/api/v1/auth/login')
      .send(loginDetails)
      .end((err, res) => {
        res.should.have.status(201);
        // eslint-disable-next-line prefer-destructuring
        token = res.body.data[0].token;
      });
  }));
});