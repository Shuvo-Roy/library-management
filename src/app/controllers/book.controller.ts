import { Request, Response, NextFunction } from 'express';
import Book from '../models/book.model';

// create book list
export const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Book created successfully',
      data: book,
    });
  } catch (error) {
    next(error);
  }
};


//get all book list
export const getBooks = async (req: Request, res: Response) => {
  const { filter, sortBy = 'createdAt', sort = 'desc', limit = '10' } = req.query;

  const query: any = {};
  if (filter) query.genre = filter;

  const books = await Book.find(query)
    .sort({ [sortBy as string]: sort === 'desc' ? -1 : 1 })
    .limit(parseInt(limit as string));

  res.json({ success: true, message: 'Books retrieved successfully', data: books });
};


//get book data by book id
export const getBookById = async (req: Request, res: Response) => {
  const book = await Book.findById(req.params.bookId);
  res.json({ success: true, message: 'Book retrieved successfully', data: book });
};


// update book data 
export const updateBook = async (req: Request, res: Response) => {
  const book = await Book.findByIdAndUpdate(req.params.bookId, req.body, { new: true });
  book?.checkAvailability();
  await book?.save();
  res.json({ success: true, message: 'Book updated successfully', data: book });
};


//delete book from
export const deleteBook = async (req: Request, res: Response) => {
  await Book.findByIdAndDelete(req.params.bookId);
  res.json({ success: true, message: 'Book deleted successfully', data: null });
};
