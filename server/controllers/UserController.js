import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import users from '../db/users';

dotenv.config();

class UserController {
  static signup(request, response) {
    const {
      email, firstName, lastName, password,
    } = request.body;
    for (let i = 0; i < users.length; i += 1) {
      if (users[i].email === email) {
        return response.status(409).json({
          status: 409,
          error: 'Email already Exist',
        });
      }
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const user = {
      id: users.length + 1,
      email,
      firstName,
      lastName,
      hash,
      type: 'staff',
      isAdmin: true,
    };
    users.push(user);
    const token = jwt.sign({
      email: user.email,
      id: user.id,
      isAdmin: user.isAdmin,
      type: user.type,
    }, process.env.SECRET, { expiresIn: '1h' });
    return response.header('x-access-token', token).status(201).json({
      status: 201,
      data: {
        token,
        firstName,
        lastName,
        email,
        password: hash,
        isAdmin: true,
        type: 'staff',
      },
    });
  }

  static login(request, response) {
    const { email, password } = request.body;
    const login = users.filter(user => user.email === email);
    if (login.length < 1) {
      return response.status(404).json({
        status: 404,
        error: 'user not found',
      });
    }
    const result = bcrypt.compareSync(password, login[0].hash);
    if (result) {
      const token = jwt.sign({
        email: login[0].email,
        id: login[0].id,
        isAdmin: login[0].isAdmin,
        type: login[0].type,
      }, process.env.SECRET, { expiresIn: '1h' });
      return response.status(200).json({
        status: 200,
        data: {
          token,
          firstName: login[0].firstName,
          lastName: login[0].lastName,
          email: login[0].email,
          password: login[0].hash,
        },
      });
    }
    return response.status(400).json({
      error: 'password invalid',
    });
  }
}

export default UserController;
