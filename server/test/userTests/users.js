/* eslint-disable no-unused-expressions */
// eslint-disable-next-line no-unused-expressions
import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import server from '../../app';

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
  it('should be able to signup a user with correct details', (done) => {
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
        done();
      });
  });
  const userWithoutFirstname = {
    lastName: 'calix',
    email: 'igwechinonso77@gmail.com',
    password: 1234,
    type: 'client',
    isAdmin: false,
  };
  it('user must provide first name', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send('x-access-token', token)
      .send(userWithoutFirstname)
      .end((request, response) => {
        response.should.have.status(400);
        response.body.should.have.property('error');
        response.body.error.should.equal('firstname is required');
        done();
      });
  });

  const userWithoutLastname = {
    firstName: 'chinonso',
    email: 'igwechinonso77@gmail.com',
    password: 1234,
    type: 'client',
    isAdmin: false,
  };
  it('user must provide last name', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send('x-access-token', token)
      .send(userWithoutLastname)
      .end((request, response) => {
        response.should.have.status(400);
        response.body.should.have.property('error');
        response.body.error.should.equal('lastname is required');
        done();
      });
  });
  const userWithoutEmail = {
    firstName: 'chinonso',
    lastName: 'calix',
    password: 1234,
    type: 'client',
    isAdmin: false,
  };
  it('user must provide email', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send('x-access-token', token)
      .send(userWithoutEmail)
      .end((request, response) => {
        response.should.have.status(400);
        response.body.should.have.property('error');
        response.body.error.should.equal('email is required');
        done();
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
  it('user must provide a valid email', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send('x-access-token', token)
      .send(userWithInvalidEmail)
      .end((request, response) => {
        response.should.have.status(400);
        response.body.should.have.property('error');
        response.body.error.should.equal('Please provide a valid email');
        done();
      });
  });

  const userWithoutPassword = {
    firstName: 'chinonso',
    lastName: 'calix',
    email: 'chi@gmail.com',
    type: 'client',
    isAdmin: false,
  };
  it('user must provide a password', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send('x-access-token', token)
      .send(userWithoutPassword)
      .end((request, response) => {
        response.should.have.status(400);
        response.body.should.have.property('error');
        response.body.error.should.equal('password is required');
        done();
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

  it('You must not register two users with the same Email', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send('x-access-token', token1)
      .send(correctUser1)
      .send(correctUser1)
      .end((request, response) => {
        response.should.have.status(409);
        response.body.should.have.property('error');
        response.body.error.should.equal('Email already Exist');
        done();
      });
  });
});

describe('POST /api/v1/auth/login', () => {
  const login = {
    email: 'igwechinonso77@gmail.com',
    password: '1234',
  };

  it('it should login a user with correct credentials', (done) => {
    chai.request(server)
      .post('/api/v1/auth/login')
      .send(login)
      .end((request, response) => {
        response.should.have.status(200);
        response.body.should.have.property('data');
        done();
      });
  });
  const noEmail = {
    email: '',
    password: '1234',
  };
  it('user should provide an email', (done) => {
    chai.request(server)
      .post('/api/v1/auth/login')
      .send(noEmail)
      .end((request, response) => {
        response.should.have.status(400);
        response.body.should.have.property('error');
        response.body.error.should.equal('email is required');
        done();
      });
  });
  const noPassword = {
    email: 'deb@gmail.com',
    password: '',
  };
  it('user should provide a password', (done) => {
    chai.request(server)
      .post('/api/v1/auth/login')
      .send(noPassword)
      .end((request, response) => {
        response.should.have.status(400);
        response.body.should.have.property('error');
        response.body.error.should.equal('password is required to login');
        done();
      });
  });
  const invalidEmail = {
    email: 'debgmail.com',
    password: '1234',
  };
  it('user should provide a valid email', (done) => {
    chai.request(server)
      .post('/api/v1/auth/login')
      .send(invalidEmail)
      .end((request, response) => {
        response.should.have.status(400);
        response.body.should.have.property('error');
        response.body.error.should.equal('Please provide a valid email');
        done();
      });
  });
});
