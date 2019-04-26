import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

class Middleware {
  /**
   * Check if returned token is for a user
   *
   * @static
   * @param {object} request  - request
   * @param {object} response - response
   * @param {object} next     - callback
   * @returns
   * @memberof AccountController
   */
  static clientData(request, response, next) {
    try {
      const token = request.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.SECRET);
      request.userData = decoded;
      next();
    } catch (error) {
      return response.status(500).json({
        status: 500,
        error: 'Internal Server Error',
      });
    }
  }

  /**
   * Check if returned token is for a staff
   *
   * @static
   * @param {object} request  - request
   * @param {object} response - response
   * @param {object} next     - callback
   * @returns
   * @memberof AccountController
   */
  static staffData(request, response, next) {
    const token = request.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.SECRET);
    request.userData = decoded;
    const { type } = request.userData;
    if (type !== 'staff') {
      return response.status(401).json({
        status: 401,
        error: 'Unauthorized',
      });
    }
    next();
  }

  /**
   * Check if an Email is a Valid Email address
   *
   * @static
   * @param {object} request  - request
   * @param {object} response - response
   * @param {object} next     - callback
   * @returns
   * @memberof AccountController
   */
  static async emailCheck(request, response, next) {
    const { userEmail } = request.params;
    const pattern = RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (!pattern.test(userEmail)) {
      return response.status(400).json({
        status: 400,
        error: 'Invalid email address',
      });
    }
    next();
  }
}

export default Middleware;
