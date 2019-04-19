import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
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
      token: jwt.sign(user.rows[0], process.env.SECRET, { expiresIn: '1h' }),
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
    return response.status(200).json({
      status: 200,
      token: jwt.sign(login.rows[0], process.env.SECRET, { expiresIn: '1h' }),
      data: login.rows,
      message: 'login successfull',
    });
  }
}

export default UserController;
