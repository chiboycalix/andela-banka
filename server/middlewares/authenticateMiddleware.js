/* eslint-disable no-restricted-globals */
class Middleware {
  /**
   * Signup Validations
   *
   * @static
   * @param {object} request  - request
   * @param {object} response - response
   * @param {object} next     - callback
   * @returns
   * @memberof AccountController
   */
  static signupValidations(request, response, next) {
    const {
      firstName, lastName, email, password,
    } = request.body;
    const pattern = RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    const noSpace = RegExp(/^[a-zA-Z0-9]*$/gm);
    const emptySpace = RegExp(/[^\s-]/);
    if (!firstName) {
      return response.status(400).json({
        status: 400,
        error: 'firstname is required',
      });
    }
    if (!noSpace.test(firstName)) {
      return response.status(400).json({
        status: 400,
        error: 'Spaces are not allowed',
      });
    }
    if (!emptySpace.test(firstName)) {
      return response.status(400).json({
        status: 400,
        error: 'Spaces are not allowed',
      });
    }
    if (!isNaN(firstName)) {
      return response.status(400).json({
        status: 400,
        error: 'Firstname must be letters',
      });
    }
    if (firstName.length < 2) {
      return response.status(400).json({
        status: 400,
        error: 'first Name must be atleast 3 alphabets',
      });
    }
    if (!lastName) {
      return response.status(400).json({
        status: 400,
        error: 'lastname is required',
      });
    }
    if (!emptySpace.test(lastName)) {
      return response.status(400).json({
        status: 400,
        error: 'Spaces are not allowed',
      });
    }
    if (!isNaN(lastName)) {
      return response.status(400).json({
        status: 400,
        error: 'Lastname must be letters',
      });
    }
    if (lastName.length < 2) {
      return response.status(400).json({
        status: 400,
        error: 'last Name must be atleast 3 alphabets',
      });
    }
    if (!email) {
      return response.status(400).json({
        status: 400,
        error: 'email is required',
      });
    }
    if (!emptySpace.test(email)) {
      return response.status(400).json({
        status: 400,
        error: 'Spaces are not allowed',
      });
    }
    if (!pattern.test(email)) {
      return response.status(400).json({
        status: 400,
        error: 'Please provide a valid email',
      });
    }
    if (!password) {
      return response.status(400).json({
        status: 400,
        error: 'password is required',
      });
    }
    next();
  }

  /**
   * Login Validations
   *
   * @static
   * @param {object} request  - request
   * @param {object} response - response
   * @param {object} next     - callback
   * @returns
   * @memberof AccountController
   */
  static loginValidations(request, response, next) {
    const { email, password } = request.body;
    const pattern = RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    const noSpace = RegExp(/^[a-zA-Z0-9]*$/gm);
    const emptySpace = RegExp(/[^\s-]/);
    if (!email) {
      return response.status(400).json({
        status: 400,
        error: 'email is required',
      });
    }
    if (!emptySpace.test(email)) {
      return response.status(400).json({
        status: 400,
        error: 'Spaces are not allowed',
      });
    }
    if (!pattern.test(email)) {
      return response.status(400).json({
        status: 400,
        error: 'Please provide a valid email',
      });
    }
    if (!password) {
      return response.status(400).json({
        status: 400,
        error: 'password is required to login',
      });
    }
    if (!emptySpace.test(password)) {
      return response.status(400).json({
        status: 400,
        error: 'Spaces are not allowed',
      });
    }
    if (!noSpace.test(password)) {
      return response.status(400).json({
        status: 400,
        error: 'Spaces are not allowed',
      });
    }
    next();
  }
}

export default Middleware;
