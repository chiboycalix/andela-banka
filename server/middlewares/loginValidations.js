import users from '../db/users';

const loginValidation = (request, response, next) => {
  const { email, password } = request.body;
  const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  for (let i = 0; i < users.length; i += 1) {
    if (!email) {
      return response.status(400).json({
        status: 400,
        error: 'email is required',
      });
    }
    if (!email.match(/[^\s-]/)) {
      return response.status(400).json({
        status: 400,
        error: 'Spaces are not allowed',
      });
    }
    if (!email.match(pattern)) {
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
  }
  if (!password.match(/[^\s-]/)) {
    return response.status(400).json({
      status: 400,
      error: 'Spaces are not allowed',
    });
  }
  next();
};

export default loginValidation;
