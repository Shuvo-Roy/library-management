"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBorrowSummary = exports.borrowBook = void 0;
const borrow_model_1 = __importDefault(require("../models/borrow.model"));
const book_model_1 = __importDefault(require("../models/book.model"));
const mongoose_1 = __importDefault(require("mongoose"));
//borrow book
const borrowBook = async (req, res, next) => {
    const { book: bookId, quantity, dueDate } = req.body;
    try {
        const session = await mongoose_1.default.startSession();
        session.startTransaction();
        const book = await book_model_1.default.findById(bookId).session(session);
        if (!book || book.copies < quantity) {
            throw new Error('Not enough copies available');
        }
        book.copies -= quantity;
        book.checkAvailability();
        await book.save({ session });
        const borrow = await borrow_model_1.default.create([{ book: book._id, quantity, dueDate }], { session });
        await session.commitTransaction();
        session.endSession();
        res.status(201).json({
            success: true,
            message: 'Book borrowed successfully',
            data: borrow[0],
        });
    }
    catch (error) {
        next(error);
    }
};
exports.borrowBook = borrowBook;
// borrow book summary
const getBorrowSummary = async (_req, res) => {
    const summary = await borrow_model_1.default.aggregate([
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
exports.getBorrowSummary = getBorrowSummary;
