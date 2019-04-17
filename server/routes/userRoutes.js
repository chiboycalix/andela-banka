import express from 'express';

import UserController from '../controllers/UserController';
import signupValidations from '../middlewares/signupValidations';


const router = express.Router();

router.post('/signup', signupValidations, UserController.signup);


export default router;
