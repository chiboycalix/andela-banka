
const signupValidation = (request, response, next) => {
  const {
    firstName, lastName, email, password,
  } = request.body;
  const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!firstName) {
    return response.status(400).json({
      status: 400,
      error: 'firstname is required',
    });
  }
  if (firstName.length < 3) {
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
  if (lastName.length < 3) {
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
  if (!email.match(pattern)) {
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
};

export default signupValidation;
