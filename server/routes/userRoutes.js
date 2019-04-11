import express from 'express';

import UserController from '../controllers/UserController';
import signupvalidation from '../middlewares/signupValidations';
import loginValidation from '../middlewares/loginValidations';
import isUser from '../middlewares/isUser';


const router = express.Router();

router.post('/signup', signupvalidation, UserController.signup);
router.post('/login', loginValidation, UserController.login);

export default router;
