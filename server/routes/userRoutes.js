import express from 'express';

import UserController from '../controllers/UserController';
import signupValidations from '../middlewares/signupValidations';
import loginValidations from '../middlewares/loginValidations';


const router = express.Router();

router.post('/signup', signupValidations, UserController.signup);
router.post('/login', loginValidations, UserController.login);

export default router;
