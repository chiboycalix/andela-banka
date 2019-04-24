/* eslint-disable no-unused-vars */
import 'babel-polyfill';
import chai from 'chai';
import chaiHttp from 'chai-http';
import passwordHash from 'password-hash';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import server from '../app';

dotenv.config();

chai.use(chaiHttp);
// const { expect } = chai;
// const baseUrl = 'api/v1/auth';
const should = chai.should();

describe('server.js tests', () => {
  it('should return welcome to banka when you visit the hoempage', (done) => {
    chai.request(server)
      .get('/')
      .end((error, response) => {
        response.should.have.status('200');
        response.body.should.have.property('message');
        response.body.message.should.equal('Welcome to banka');
        done();
      });
  });
  it('should return not found when you visit a page that does not exist', (done) => {
    chai.request(server)
      .get('/jhggg')
      .end((error, response) => {
        response.should.have.status('404');
        response.body.should.have.property('error');
        response.body.error.should.equal('404 NOT FOUND');
        done();
      });
  });
});

const hashedPassword = passwordHash.generate('password');
const user = {
  firstName: 'nonso',
  lastName: 'calix',
  email: 'calix@gmail.com',
  password: hashedPassword,
  isAdmin: false,
  type: 'client',
};
const token = jwt.sign(user, process.env.SECRET, { expiresIn: '1h' });

describe('POST api/v1/auth/signup', () => {
  it('should be able to signup a user with correct details', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send('x-access-token', token)
      .send(user)
      .end((error, response) => {
        response.should.have.status(201);
        response.body.should.be.a('object');
        response.body.should.have.property('data');
        response.body.should.have.property('token');
        done();
      });
  });

  it('should be not create a user with the same email as before', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send('x-access-token', token)
      .send(user)
      .end((error, response) => {
        response.should.have.status(409);
        done();
      });
  });
  const userWithoutFirstname = {
    firstName: '',
    lastName: 'calix',
    email: 'calix@gmail.com',
    password: hashedPassword,
    isAdmin: true,
    type: 'staff',
  };
  it('user must provide first name', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
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
    lastName: '',
    email: 'calix@gmail.com',
    password: 'password',
    type: 'client',
    isAdmin: false,
  };
  it('user must provide last name', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
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
    password: 'password',
    type: 'client',
    isAdmin: false,
  };
  it('user must provide email', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
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
    email: 'calixgmail.com',
    password: 'password',
    type: 'client',
    isAdmin: false,
  };
  it('user must provide a valid email', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
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
    email: 'calix@gmail.com',
    type: 'client',
    isAdmin: false,
  };
  it('user must provide a password', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(userWithoutPassword)
      .end((request, response) => {
        response.should.have.status(400);
        response.body.should.have.property('error');
        response.body.error.should.equal('password is required');
        done();
      });
  });

  const nanfirstname = {
    firstName: 123,
    lastName: 'calix',
    email: 'calix@gmail.com',
    password: 'password',
  };
  it('should not allow spaces', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(nanfirstname)
      .end((error, response) => {
        response.should.have.status(400);
        response.body.should.have.property('error');
        response.body.error.should.equal('Firstname must be letters');
        done();
      });
  });

  const nanlastname = {
    firstName: 'nonso',
    lastName: 123,
    email: 'calix@gmail.com',
    password: 'password',
  };
  it('should not allow spaces', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(nanlastname)
      .end((error, response) => {
        response.should.have.status(400);
        response.body.should.have.property('error');
        response.body.error.should.equal('Lastname must be letters');
        done();
      });
  });

  const firstnameLength = {
    firstName: 'n',
    lastName: 'calix',
    email: 'calix@gmail.com',
    password: 'password',
  };
  it('first Name must be atleast 3 alphabets', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(firstnameLength)
      .end((error, response) => {
        response.should.have.status(400);
        response.body.should.have.property('error');
        response.body.error.should.equal('first Name must be atleast 3 alphabets');
        done();
      });
  });

  const lastnameLength = {
    firstName: 'nonso',
    lastName: 'c',
    email: 'calix@gmail.com',
    password: 'password',
  };
  it('last Name must be atleast 3 alphabets', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(lastnameLength)
      .end((error, response) => {
        response.should.have.status(400);
        response.body.should.have.property('error');
        response.body.error.should.equal('last Name must be atleast 3 alphabets');
        done();
      });
  });
});

describe('POST /auth/login', () => {
  it('it should log in the user', (done) => {
    const loginDetails = {
      email: 'calix@gmail.com',
      password: 'password',
    };
    chai.request(server)
      .post('/api/v1/auth/login')
      .send(loginDetails)
      .end((error, response) => {
        response.should.have.status(400);
        done();
      });
  });
  it('it should not log in the user without email', (done) => {
    const loginDetails = {
      email: '',
      password: 'password',
    };
    chai.request(server)
      .post('/api/v1/auth/login')
      .send(loginDetails)
      .end((error, response) => {
        response.should.have.status(400);
        done();
      });
  });
  it('it should not log in the user without password', (done) => {
    const loginDetails = {
      email: 'calix@gmail.com',
      password: '',
    };
    chai.request(server)
      .post('/api/v1/auth/login')
      .send(loginDetails)
      .end((error, response) => {
        response.should.have.status(400);
        done();
      });
  });

  it('it should not log in the user incorrect email', (done) => {
    const loginDetails = {
      email: 'calix123@gmail.com',
      password: 'password',
    };
    chai.request(server)
      .post('/api/v1/auth/login')
      .send(loginDetails)
      .end((error, response) => {
        response.should.have.status(404);
        response.body.should.have.property('error');
        response.body.error.should.equal('Email does not exist');
        done();
      });
  });
});

describe('Create account test', () => {
  const accountnumber = Math.floor(1000000000 + Math.random() * 9000000000);
  const account = {
    type: 'savings',
    balance: 50000.32,
    accountnumber,
    owner: 6,
  };
  it('only a logged in user should be able to create an account', (done) => {
    chai.request(server)
      .post('/api/v1/accounts')
      .set('Authorization', `Bearer ${token}`)
      .send(account)
      .end((error, response) => {
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
  const staffToken = jwt.sign(staff, process.env.SECRET, { expiresIn: '1h' });
  it('should be able to signup a staff with the correct details', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send('x-access-token', staffToken)
      .send(staff)
      .end((request, response) => {
        response.should.have.status(201);
        response.body.should.be.a('object');
        response.body.should.have.property('data');
        response.body.should.have.property('token');
        done();
      });
  });

  const updatedAccount = {
    status: 'dormant',
  };
  it('only a staff can update an account', (done) => {
    chai.request(server)
      .patch(`/api/v1/accounts/${accountnumber}`)
      .send(updatedAccount)
      .set('Authorization', `Bearer ${staffToken}`)
      .end((err, response) => {
        response.should.have.status(200);
      });
    done();
  });
});
