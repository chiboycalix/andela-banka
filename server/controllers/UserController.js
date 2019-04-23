import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../queryhelpers/userQuery';

dotenv.config();


class UserController {
  // Signup function
  static async signup(request, response) {
    const check = await User.checkEmail(request.body.email).catch(error => error.message);
    if (check) {
      return response.status(409).json({
        status: 409,
        error: 'email exist',
      });
    }
    const user = await User.createUser(request.body);
    return response.status(201).json({
      status: 201,
      token: jwt.sign(user.rows[0], process.env.SECRET, { expiresIn: '100h' }),
      data: user.rows,
      message: 'successfully signed up user',
    });
  }

  // Login function
  static async login(request, response) {
    const checkMail = await User.checkEmail(request.body.email);
    if (!checkMail) {
      return response.status(404).json({
        status: 404,
        error: 'Email does not exist',
      });
    }

    const login = await User.loginUser(request.body);
    const pass = bcrypt.compareSync(request.body.password, login.rows[0].password);
    if (!pass) {
      return response.status(400).json({
        status: 400,
        error: 'Password does not match',
      });
    }
    return response.status(200).json({
      status: 200,
      token: jwt.sign(login.rows[0], process.env.SECRET, { expiresIn: '100h' }),
      data: login.rows,
      message: 'login successfull',
    });
  }

  static async getAccounts(request, response) {
    const account = await User.allAccounts();
    return response.status(200).json({
      status: 200,
      data: account.rows,
    });
  }
}

export default UserController;
