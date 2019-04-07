import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export default (request, response, next) => {
  try {
    const token = request.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.SECRET);
    request.userData = decoded;
    next();
  } catch (error) {
    return response.status(401).json({
      status: 401,
      error: 'Unauthorized',
    });
  }
};
