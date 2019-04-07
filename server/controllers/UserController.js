import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import users from '../db/users';


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
      }, 'secret', { expiresIn: '1h' });
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
}

export default UserController;
