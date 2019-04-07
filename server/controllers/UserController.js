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
    bcrypt.hash(password, 10, (error, hash) => {
      if (error) {
        return response.status(500).json({
          status: 500,
          error,
        });
      }
      const user = {
        id: users.length + 1,
        email,
        firstName,
        lastName,
        password,
        type: 'staff',
        isAdmin: true,
      };
      users.push(user);
      const token = jwt.sign({
        email: users.email,
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
    });
  }

  static login(request, response) {
    const {
      email, password,
    } = request.body;
    for (let i = 0; i < users.length; i += 1) {
      if (users[i].email === email && users[i].password === password) {
        const token = jwt.sign({
          email: users[i].email,
          id: users[i].id,
          isAdmin: users[i].isAdmin,
          type: users[i].type,
        }, process.env.SECRET, { expiresIn: '1h' });
        return response.header('x-access-token', token).status(200).json({
          status: 200,
          data: {
            token,
            id: users[i].id,
            firstName: users[i].firstName,
            lastName: users[i].lastName,
            email,
            type: users[i].type,
            isAdmin: users[i].isAdmin,
          },
        });
      }
    }
    return response.status(404).json({
      status: 404,
      error: 'Email or Password is Incorrect',
    });
  }
}

export default UserController;
