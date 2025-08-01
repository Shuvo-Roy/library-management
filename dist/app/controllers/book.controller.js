"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.getBookById = exports.getBooks = exports.createBook = void 0;
const book_model_1 = __importDefault(require("../models/book.model"));
// create book list
const createBook = async (req, res, next) => {
    try {
        const book = await book_model_1.default.create(req.body);
        res.status(201).json({
            success: true,
            message: 'Book created successfully',
            data: book,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createBook = createBook;
//get all book list
const getBooks = async (req, res) => {
    const { filter, sortBy = 'createdAt', sort = 'desc', limit = '10' } = req.query;
    const query = {};
    if (filter)
        query.genre = filter;
    const books = await book_model_1.default.find(query)
        .sort({ [sortBy]: sort === 'desc' ? -1 : 1 })
        .limit(parseInt(limit));
    res.json({ success: true, message: 'Books retrieved successfully', data: books });
};
exports.getBooks = getBooks;
//get book data by book id
const getBookById = async (req, res) => {
    const book = await book_model_1.default.findById(req.params.bookId);
    res.json({ success: true, message: 'Book retrieved successfully', data: book });
};
exports.getBookById = getBookById;
// update book data 
const updateBook = async (req, res) => {
    const book = await book_model_1.default.findByIdAndUpdate(req.params.bookId, req.body, { new: true });
    book?.checkAvailability();
    await book?.save();
    res.json({ success: true, message: 'Book updated successfully', data: book });
};
exports.updateBook = updateBook;
//delete book from
const deleteBook = async (req, res) => {
    await book_model_1.default.findByIdAndDelete(req.params.bookId);
    res.json({ success: true, message: 'Book deleted successfully', data: null });
};
exports.deleteBook = deleteBook;
