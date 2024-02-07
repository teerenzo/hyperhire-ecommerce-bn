import express from 'express';
import { Router } from 'express';
import authRouter from './userRouter';
import bookRouter from './bookRouter';
import orderRouter from './orderRouter';

const router: Router = express.Router();

router.use('/auth', authRouter);
router.use('/books', bookRouter);
router.use('/orders', orderRouter);

export default router;