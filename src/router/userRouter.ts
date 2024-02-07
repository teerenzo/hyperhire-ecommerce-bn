import express from 'express';
import { Router } from 'express';
import { UserController } from '../controller/userController';

const userController = new UserController();

const router: Router = express.Router();

router.post('/signup', userController.createUser);
router.post('/login', userController.userLogin);

export default router;