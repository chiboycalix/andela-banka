/* eslint-disable no-unused-expressions */
// eslint-disable-next-line no-unused-expressions
import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
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

describe('signup tests', () => {
  const correctUser = {
    firstName: 'chinonso',
    lastName: 'calix',
    email: 'igwechinonso77@gmail.com',
    password: 1234,
    type: 'client',
    isAdmin: false,
  };
  it('should signup a user with correct inputs', () => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(correctUser)
      .end((err, response) => {
        response.should.have.status(200);
      });
  });
  const noFirstname = {
    firstName: '',
    lastName: 'calix',
    email: 'igwechinonso77@gmail.com',
    password: 1234,
    type: 'client',
    isAdmin: false,
  };
  it('first name is required', () => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(noFirstname)
      .end((err, response) => {
        response.should.have.status(400);
        response.body.should.have.property('error');
        response.body.error.should.equal('firstname is required');
      });
  });
  const noLastname = {
    firstName: 'chinonso',
    lastName: '',
    email: 'igwechinonso77@gmail.com',
    password: 1234,
    type: 'client',
    isAdmin: false,
  };
  it('lastname is required', () => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(noLastname)
      .end((err, response) => {
        response.should.have.status(400);
        response.body.should.have.property('error');
        response.body.error.should.equal('lastname is required');
      });
  });
  const firstnameLetters = {
    firstName: '1234',
    lastName: 'calix',
    email: 'igwechinonso77@gmail.com',
    password: 1234,
    type: 'client',
    isAdmin: false,
  };
  it('Firstname must be letters', () => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(firstnameLetters)
      .end((err, response) => {
        response.should.have.status(400);
        response.body.should.have.property('error');
        response.body.error.should.equal('Firstname must be letters');
      });
  });
  const lastnameLetters = {
    firstName: 'chinonso',
    lastName: '1234',
    email: 'igwechinonso77@gmail.com',
    password: 1234,
    type: 'client',
    isAdmin: false,
  };
  it('Lastname must be letters', () => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(lastnameLetters)
      .end((err, response) => {
        response.should.have.status(400);
        response.body.should.have.property('error');
        response.body.error.should.equal('Lastname must be letters');
      });
  });
  const firstnameLength = {
    firstName: 'c',
    lastName: '1234',
    email: 'igwechinonso77@gmail.com',
    password: 1234,
    type: 'client',
    isAdmin: false,
  };
  it('last Name must be atleast 3 alphabets', () => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(firstnameLength)
      .end((err, response) => {
        response.should.have.status(400);
        response.body.should.have.property('error');
        response.body.error.should.equal('first Name must be atleast 3 alphabets');
      });
  });
  const lastnameLength = {
    firstName: 'chinonso',
    lastName: 'c',
    email: 'igwechinonso77@gmail.com',
    password: 1234,
    type: 'client',
    isAdmin: false,
  };
  it('last Name must be atleast 3 alphabets', () => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(lastnameLength)
      .end((err, response) => {
        response.should.have.status(400);
        response.body.should.have.property('error');
        response.body.error.should.equal('last Name must be atleast 3 alphabets');
      });
  });
  const firstnameNoSpace = {
    firstName: ' ',
    lastName: 'calix',
    email: 'igwechinonso77@gmail.com',
    password: 1234,
    type: 'client',
    isAdmin: false,
  };
  it('Spaces are not allowed', () => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(firstnameNoSpace)
      .end((err, response) => {
        response.should.have.status(400);
        response.body.should.have.property('error');
        response.body.error.should.equal('Spaces are not allowed');
      });
  });
  const firstnameNoSpaceBetween = {
    firstName: 'chin ',
    lastName: 'calix',
    email: 'igwechinonso77@gmail.com',
    password: 1234,
    type: 'client',
    isAdmin: false,
  };
  it('Spaces are not allowed', () => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(firstnameNoSpaceBetween)
      .end((err, response) => {
        response.should.have.status(400);
        response.body.should.have.property('error');
        response.body.error.should.equal('Spaces are not allowed');
      });
  });
  const lastnameNoSpaceBetween = {
    firstName: 'chinonso',
    lastName: ' calix',
    email: 'igwechinonso77@gmail.com',
    password: 1234,
    type: 'client',
    isAdmin: false,
  };
  it('Spaces are not allowed', () => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(lastnameNoSpaceBetween)
      .end((err, response) => {
        response.should.have.status(400);
        response.body.should.have.property('error');
        response.body.error.should.equal('Spaces are not allowed');
      });
  });

  const lastnameNoSpace = {
    firstName: 'chinonso',
    lastName: ' ',
    email: 'igwechinonso77@gmail.com',
    password: 1234,
    type: 'client',
    isAdmin: false,
  };
  it('Spaces are not allowed', () => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(lastnameNoSpace)
      .end((err, response) => {
        response.should.have.status(400);
        response.body.should.have.property('error');
        response.body.error.should.equal('Spaces are not allowed');
      });
  });
  const noEmail = {
    firstName: 'chinonso',
    lastName: 'calix',
    email: '',
    password: 1234,
    type: 'client',
    isAdmin: false,
  };
  it('email is required', () => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(noEmail)
      .end((err, response) => {
        response.should.have.status(400);
        response.body.should.have.property('error');
        response.body.error.should.equal('email is required');
      });
  });
  const nospaceEmail = {
    firstName: 'chinonso',
    lastName: 'calix',
    email: ' ',
    password: 1234,
    type: 'client',
    isAdmin: false,
  };
  it('Spaces are not allowed', () => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(nospaceEmail)
      .end((err, response) => {
        response.should.have.status(400);
        response.body.should.have.property('error');
        response.body.error.should.equal('Spaces are not allowed');
      });
  });
  const invalidEmail = {
    firstName: 'chinonso',
    lastName: 'calix',
    email: 'clientgmail.com',
    password: 1234,
    type: 'client',
    isAdmin: false,
  };
  it('Please provide a valid email', () => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(invalidEmail)
      .end((request, response) => {
        response.should.have.status(400);
        response.body.should.have.property('error');
        response.body.error.should.equal('Please provide a valid email');
      });
  });
  const noPass = {
    firstName: 'chinonso',
    lastName: 'calix',
    email: 'client@gmail.com',
    type: 'client',
    isAdmin: false,
  };
  it('password is required', () => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(noPass)
      .end((request, response) => {
        response.should.have.status(400);
        response.body.should.have.property('error');
        response.body.error.should.equal('password is required');
      });
  });
});

describe('login tests', () => {
  // it('should log users in with the right credentials', () => {
  //   const loginDetails = {
  //     email: 'chi@gmail.com',
  //     password: 'chi',
  //   };
  //   chai.request(server)
  //     .post('api/v1/auth/login')
  //     .send(loginDetails)
  //     .end((error, response) => {
  //       response.should.have.status(200);
  //     });
  // });

  it('should not login a user without an email', () => {
    const noEmail = {
      email: '',
      password: 'chi',
    };
    chai.request(server)
      .post('api/v1/auth/login')
      .send(noEmail)
      .end((error, response) => {
        response.should.have.status(400);
        response.body.should.have.property('error');
        response.body.error.should.equal('Please provide a valid email');
      });
  });

  it('should not login a user without a password', () => {
    const noPass = {
      email: 'chi@gmail.com',
      password: '',
    };
    chai.request(server)
      .post('api/v1/auth/login')
      .send(noPass)
      .end((error, response) => {
        response.should.have.status(400);
      });
  });

  it('should not login a user with invalid email', () => {
    const invalidEmail = {
      email: 'igwechinonso77gmail.com',
      password: 1234,
    };
    chai.request(server)
      .post('api/v1/auth/login')
      .send(invalidEmail)
      .end((error, response) => {
        response.should.have.status(400);
      });
  });
});
