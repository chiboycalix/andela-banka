/* eslint-disable prefer-destructuring */
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
let token;
let token2;
describe('GET /auth/login', () => {
  it('it should log in the user', (() => {
    const loginDetails = {
      email: 'staff@gmail.com',
      password: 'password',
    };
    chai.request(server)
      .post('/api/v1/auth/login')
      .send(loginDetails)
      .end((err, res) => {
        res.should.have.status(200);
        token = res.body.data[0].token;
      });
  }));

  it('it should log in the user', (() => {
    const loginDetails = {
      email: 'client@gmail.com',
      password: 'password',
    };
    chai.request(server)
      .post('/api/v1/auth/login')
      .send(loginDetails)
      .end((err, res) => {
        res.should.have.status(200);
        token2 = res.body.data[0].token;
      });
  }));
});

describe('create account', () => {
  const chi = jwt.sign({
    id: 1,
    email: 'staff@gmail.com',
    password: 'password',
  }, process.env.SECRET, { expiresIn: '1h' });
  it('it should create new account', (() => {
    const account = {
      id: 1,
      accountNumber: '0114276912',
      createdOn: '12/12/2009',
      owner: 1,
      type: 'savings',
      status: 'active',
      balance: 50000.32,
    };
    chai.request(server)
      .post('/api/v1/accounts')
      .send(account)
      .set('Authorization', `Bearer ${chi}`)
      .end((err, res) => {
        res.should.have.status(201);
      });
  }));
});

describe('PATCH /account/', () => {
  it('it should edit an account', (() => {
    const account = {
      id: 1,
      accountNumber: '0114276912',
      createdOn: '12/12/2009',
      owner: 1,
      type: 'savings',
      status: 'dormant',
      balance: 50000.32,
    };
    const chi = jwt.sign({
      email: 'staff@gmail.com',
      password: 'password',
    }, process.env.SECRET, { expiresIn: '1h' });
    chai.request(server)
      .patch('/api/v1/accounts/0114276912')
      .send(account)
      .set('Authorization', `Bearer ${chi}`)
      .end((err, res) => {
        res.should.have.status(404);
      });
  }));
  // it('it should return 401', ((done) => {
  //   const party = {
  //     name: 'Peace and Unity Group',
  //     hqAddress: 'Blk 2, Adeun Estate',
  //     logoUrl: 'partylogo.jpg'
  //   }
  //   chai.request(app)
  //     .patch('/api/v1/parties/3/name')
  //     .send(party)
  //     .set('authorization', token2)
  //     .end((err, res) => {
  //       res.should.have.status(401);
  //       done(err);
  //     });
  // }));
  // it('it should return 404', ((done) => {
  //   const party = {
  //     name: 'Peace and Unity Group',
  //     hqAddress: 'Blk 2, Adeun Estate',
  //     logoUrl: 'partylogo.jpg'
  //   }
  //   chai.request(app)
  //     .patch('/api/v1/parties/60/name')
  //     .send(party)
  //     .set('authorization', token)
  //     .end((err, res) => {
  //       res.should.have.status(404);
  //       done(err);
  //     });
  // }));
});


// describe('All Account tests', () => {
//   const client = {
//     firstName: 'chinonso',
//     lastName: 'calix',
//     email: 'igwechinonso@gmail.com',
//     password: 1234,
//     type: 'client',
//     isAdmin: false,
//   };
//   const clientToken = jwt.sign({
//     email: client.email,
//     id: client.id,
//     isAdmin: client.isAdmin,
//     type: client.type,
//   }, process.env.SECRET, { expiresIn: '1h' });
//   it('should be able to signup a user with correct details', () => {
//     chai.request(server)
//       .post('/api/v1/auth/signup')
//       .send('x-access-token', clientToken)
//       .send(client)
//       .end((request, response) => {
//         response.should.have.status(201);
//         response.body.should.be.a('object');
//         response.body.should.have.property('data');
//       });
//   });
//   const account = {
//     id: 1,
//     accountNumber: '0114276912',
//     createdOn: '12/12/2009',
//     owner: 1,
//     type: 'savings',
//     status: 'active',
//     balance: 50000.32,
//   };
//   it('only a logged in user should be able to create an account', (done) => {
//     chai.request(server)
//       .post('/api/v1/accounts')
//       .send(account)
//       .set('Authorization', `Bearer ${clientToken}`)
//       .end((err, response) => {
//         response.should.have.status(201);
//       });
//     done();
//   });

//   it('you should not be able to create account if you are not logged in', (done) => {
//     chai.request(server)
//       .post('/api/v1/accounts')
//       .send(account)
//       .end((err, response) => {
//         response.should.have.status(401);
//         response.body.should.have.property('error');
//         response.body.error.should.equal('Unauthorized');
//       });
//     done();
//   });

//   const staff = {
//     firstName: 'chinonso',
//     lastName: 'calix',
//     email: 'staff@gmail.com',
//     password: 1234,
//     type: 'staff',
//     isAdmin: true,
//   };
//   const staffToken = jwt.sign({
//     email: staff.email,
//     id: staff.id,
//     isAdmin: staff.isAdmin,
//     type: staff.type,
//   }, process.env.SECRET, { expiresIn: '1h' });
//   it('should be able to signup a staff with the correct details', () => {
//     chai.request(server)
//       .post('/api/v1/auth/signup')
//       .send('x-access-token', staffToken)
//       .send(staff)
//       .end((request, response) => {
//         response.should.have.status(201);
//         response.body.should.be.a('object');
//         response.body.should.have.property('data');
//       });
//   });
//   const updatedAccount = {
//     id: 1,
//     accountNumber: '0114276912',
//     createdOn: '12/12/2009',
//     owner: 1,
//     type: 'savings',
//     status: 'dormant',
//     balance: 50000.32,
//   };
//   it('only a staff can update an account', (done) => {
//     chai.request(server)
//       .patch('/api/v1/accounts/0114276912')
//       .send(updatedAccount)
//       .set('Authorization', `Bearer ${staffToken}`)
//       .end((err, response) => {
//         response.should.have.status(200);
//       });
//     done();
//   });

//   it('only an a staff should be able to get all accounts', (done) => {
//     chai.request(server)
//       .get('/api/v1/accounts')
//       .set('Authorization', `Bearer ${staffToken}`)
//       .end((err, response) => {
//         response.should.have.status(200);
//       });
//     done();
//   });

//   it('only an a staff should be able to get a single account number', (done) => {
//     chai.request(server)
//       .get('/api/v1/accounts/0114276912')
//       .set('Authorization', `Bearer ${staffToken}`)
//       .end((err, response) => {
//         response.should.have.status(200);
//       });
//     done();
//   });

//   it('only an a staff should be able to delete an account number', (done) => {
//     chai.request(server)
//       .delete('/api/v1/accounts/0114276912')
//       .set('Authorization', `Bearer ${staffToken}`)
//       .end((err, response) => {
//         response.should.have.status(200);
//       });
//     done();
//   });
// });
