import express from 'express';
import {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
} from '../controllers/book.controller';

import { validateRequest } from '../middlewares/validate.request';
import { createBookSchema, updateBookSchema } from '../validations/book.validation';

const router = express.Router();

router.post('/', validateRequest(createBookSchema), createBook);
router.get('/', getBooks);
router.get('/:bookId', getBookById);
router.patch('/:bookId', validateRequest(updateBookSchema), updateBook);
router.delete('/:bookId', deleteBook);

export default router;
