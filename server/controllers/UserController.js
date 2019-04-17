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
    });
  }
}

export default UserController;
