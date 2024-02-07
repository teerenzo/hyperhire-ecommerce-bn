import express from 'express';
import { Router } from 'express';
import { BookController } from '../controller/bookController';
import { protect } from '../middleware/protect';

const bookController = new BookController();

const router: Router = express.Router();

router.get('/', bookController.getBooks);
router.post('/add', protect, bookController.addBook);
router.get('/:id', bookController.getBook);
router.put('/:id', protect, bookController.updateBook);


export default router;