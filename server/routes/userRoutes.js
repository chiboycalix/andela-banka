import express from 'express';

import UserController from '../controllers/UserController';
import loginValidations from '../middlewares/loginValidations';
import signupValidations from '../middlewares/signupValidations';


const router = express.Router();

router.post('/signup', signupValidations, UserController.signup);
router.post('/login', loginValidations, UserController.login);

export default router;
