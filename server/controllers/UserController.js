import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../queryhelpers/userQuery';

dotenv.config();


class UserController {
  /**
   * Sign's up a user
   *
   * @static
   * @param {object} request  - request
   * @param {object} response - response
   * @param {object} next     - callback
   * @returns
   * @memberof UserController
   */
  static async signup(request, response) {
    const check = await User.checkEmail(request.body.email).catch(error => error.message);
    if (check) {
      return response.status(409).json({
        status: 409,
        error: 'User already exists',
      });
    }
    const user = await User.createUser(request.body);
    const {
      id, email, type, firstname, lastname,
    } = user.rows[0];
    jwt.sign({id, email, type, firstname, lastname}, process.env.SECRET, { expiresIn: '1h' }, (error, token) => {
      if (error) {
        return response.status(400).json({
          status: 400,
          error: 'invalid token'
        })
      }
      return response.status(201).json({
        status: 201,
        data: {
          id,firstname, lastname, email, token, type
        },
        message: 'successfully signed up user',
      })
    });
  }

  /**
   * Login a user
   *
   * @static
   * @param {object} request  - request
   * @param {object} response - response
   * @param {object} next     - callback
   * @returns
   * @memberof UserController
   */
  static async login(request, response) {
    const checkMail = await User.checkEmail(request.body.email);
    if (!checkMail) {
      return response.status(400).json({
        status: 400,
        error: 'Invalid credentials',
      });
    }

    const login = await User.loginUser(request.body);
    const password = await bcrypt.compareSync(request.body.password, login.rows[0].password);
    if (!password) {
      return response.status(400).json({
        status: 400,
        error: 'Invalid credentials',
      });
    }
    const {
      id, email, type, firstname, lastname
    } = login.rows[0];
    jwt.sign({id, email, type, firstname, lastname}, process.env.SECRET, { expiresIn: '1h' }, (error, token) => {
      if (error) {
        return response.status(400).json({
          status: 400,
          error: 'invalid token'
        })
      }
      return response.status(200).json({
        status: 200,
        data: {
          id,firstname, lastname, email, token, type
        },
        message: 'login successful',
      })
    });
  }

  /**
   * Get all accounts created by a user using his email address as the filter criteria
   *
   * @static
   * @param {object} request  - request
   * @param {object} response - response
   * @param {object} next     - callback
   * @returns
   * @memberof UserController
   */
  static async getAccounts(request, response) {
    const account = await User.allAccounts(request.params.userEmail);
    const checkAccount = await User.checkAccount(request.params.userEmail);
    if (!checkAccount) {
      return response.status(404).json({
        status: 404,
        error: 'Account does not exist',
      });
    }
    return response.status(200).json({
      status: 200,
      data: account.rows,
    });
  }
}

export default UserController;
