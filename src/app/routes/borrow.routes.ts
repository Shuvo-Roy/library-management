import express from 'express';
import { borrowBook, getBorrowSummary } from '../controllers/borrow.controller';
import { validateRequest } from '../middlewares/validate.request'; 
import { borrowBookSchema } from '../validations/borrow.validation';

const router = express.Router();

router.post('/', validateRequest(borrowBookSchema), borrowBook);
router.get('/', getBorrowSummary);

export default router;
