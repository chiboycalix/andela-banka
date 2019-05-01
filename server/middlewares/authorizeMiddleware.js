import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

class Middleware {
  /**
   * Cleint Middleware
   *
   * @static
   * @param {*} request   - request
   * @param {*} response  - response
   * @param {*} next      - next
   * @returns
   * @memberof Middleware
   */
  static clientData(request, response, next) {
    try {
      const token = request.headers.authorization.split(' ')[1];
      jwt.verify(token, process.env.SECRET, (error, decoded) => {
        if (error) {
          return response.status(403).json({
            status: 403,
            error: 'Invalid token'
          });
        }
        request.userData = decoded;
        const { type } = request.userData;
        if (type === 'staff') {
          return response.status(401).json({
            status: 401,
            error: 'Unauthorized',
          });
        }
        next();
      });
    } catch (error) {
      return response.status(500).json({
        status: 500,
        error: 'Internal Server Error',
      });
    }
  }

  /**
   * Staff Middleware
   *
   * @static
   * @param {*} request   - request
   * @param {*} response  - response
   * @param {*} next      - next
   * @returns
   * @memberof Middleware
   */
  static staffData(request, response, next) {
    try {
      const token = request.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.SECRET, (error, decoded) => {
      if (error) {
        return response.status(403).json({
          status: 403,
          error: 'Invalid token',
        });
      }
      request.userData = decoded;
      const { type } = request.userData;
      if (type !== 'staff') {
        return response.status(401).json({
          status: 401,
          error: 'Unauthorized',
        });
      }
      if (type === 'client') {
        return response.status(401).json({
          status: 401,
          error: 'Unauthorized',
        });
      }
      next();
    });
    } catch (error) {
      return response.status(500).json({
        status: 500,
        error: 'Internal server error',
      });
    }
    
  }

  /**
   * Email check Middleware
   *
   * @static
   * @param {*} request   - request
   * @param {*} response  - response
   * @param {*} next      - next
   * @returns
   * @memberof Middleware
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
