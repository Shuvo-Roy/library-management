import { Request, Response, NextFunction } from 'express';
import Borrow from '../models/borrow.model';
import Book from '../models/book.model';
import mongoose from 'mongoose';


//borrow book
export const borrowBook = async (req: Request, res: Response, next: NextFunction) => {
  const { book: bookId, quantity, dueDate } = req.body;

  try {
    const session = await mongoose.startSession();
    session.startTransaction();

    const book = await Book.findById(bookId).session(session);
    if (!book || book.copies < quantity) {
      throw new Error('Not enough copies available');
    }

    book.copies -= quantity;
    book.checkAvailability();
    await book.save({ session });

    const borrow = await Borrow.create([{ book: book._id, quantity, dueDate }], { session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      message: 'Book borrowed successfully',
      data: borrow[0],
    });
  } catch (error) {
    next(error);
  }
};


// borrow book summary
export const getBorrowSummary = async (_req: Request, res: Response) => {
  const summary = await Borrow.aggregate([
    {
      $group: {
        _id: '$book',
        totalQuantity: { $sum: '$quantity' }
      }
    },
    {
      $lookup: {
        from: 'books',
        localField: '_id',
        foreignField: '_id',
        as: 'bookDetails'
      }
    },
    { $unwind: '$bookDetails' },
    {
      $project: {
        book: {
          title: '$bookDetails.title',
          isbn: '$bookDetails.isbn',
        },
        totalQuantity: 1
      }
    }
  ]);

  res.json({
    success: true,
    message: 'Borrowed books summary retrieved successfully',
    data: summary,
  });
};
