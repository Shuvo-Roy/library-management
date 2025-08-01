"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("../controllers/book.controller");
const validate_request_1 = require("../middlewares/validate.request");
const book_validation_1 = require("../validations/book.validation");
const router = express_1.default.Router();
router.post('/', (0, validate_request_1.validateRequest)(book_validation_1.createBookSchema), book_controller_1.createBook);
router.get('/', book_controller_1.getBooks);
router.get('/:bookId', book_controller_1.getBookById);
router.patch('/:bookId', (0, validate_request_1.validateRequest)(book_validation_1.updateBookSchema), book_controller_1.updateBook);
router.delete('/:bookId', book_controller_1.deleteBook);
exports.default = router;
