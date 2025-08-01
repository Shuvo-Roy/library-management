"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBookSchema = exports.createBookSchema = void 0;
const zod_1 = require("zod");
exports.createBookSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Title is required'),
    author: zod_1.z.string().min(1, 'Author is required'),
    genre: zod_1.z.string().min(1, 'Genre is required'),
    isbn: zod_1.z.string().min(10, 'ISBN must be at least 10 characters'),
    description: zod_1.z.string().optional(),
    copies: zod_1.z.number().min(1),
});
exports.updateBookSchema = exports.createBookSchema.partial();
