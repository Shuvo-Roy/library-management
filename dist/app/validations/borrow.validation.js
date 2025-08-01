"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowBookSchema = void 0;
const zod_1 = require("zod");
exports.borrowBookSchema = zod_1.z.object({
    book: zod_1.z.string().length(24, 'Invalid Book ID'),
    quantity: zod_1.z.number().int().positive(),
    dueDate: zod_1.z.string().refine(date => !isNaN(Date.parse(date)), {
        message: 'Invalid date format',
    }),
});
