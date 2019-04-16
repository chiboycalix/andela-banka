import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const isStaff = (request, response, next) => {
  const token = request.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, process.env.SECRET);
  request.userData = decoded;
  const { type } = request.userData;
  if (type !== 'staff') {
    return response.status(401).json({
      status: 401,
      error: 'Only a staff can perform this operation',
    });
  }
  next();
};

export default isStaff;
